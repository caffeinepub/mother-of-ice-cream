import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Float "mo:core/Float";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  module IceCreamFlavor {
    public func compare(flavor1 : IceCreamFlavor, flavor2 : IceCreamFlavor) : Order.Order {
      Nat.compare(flavor1.id, flavor2.id);
    };

    public func compareByName(flavor1 : IceCreamFlavor, flavor2 : IceCreamFlavor) : Order.Order {
      Text.compare(flavor1.name, flavor2.name);
    };
  };

  type IceCreamFlavor = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : ?Text;
    isAvailable : Bool;
    isFeatured : Bool;
  };

  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  public type OrderItem = {
    flavorId : Nat;
    flavorName : Text;
    quantity : Nat;
    price : Float;
  };

  public type Order = {
    id : Nat;
    customerName : Text;
    customerPhone : Text;
    deliveryAddress : Text;
    items : [OrderItem];
    totalAmount : Float;
    status : Text;
    timestamp : Time.Time;
    razorpayOrderId : Text;
    razorpayPaymentId : Text;
  };

  public type IceCreamFlavorInput = {
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : ?Text;
    isAvailable : Bool;
    isFeatured : Bool;
  };

  public type IceCreamFlavorUpdate = {
    name : ?Text;
    description : ?Text;
    price : ?Float;
    category : ?Text;
    imageUrl : ?Text;
    isAvailable : ?Bool;
    isFeatured : ?Bool;
  };

  public type UserProfile = {
    name : Text;
  };

  // Explicit migration: preserve old stable sampleFlavors so M0169 is not triggered.
  // This was implicitly stable in the previous version; we retain it here and clear it in postupgrade.
  stable var sampleFlavors : [IceCreamFlavor] = [];

  // Stable state - persists across upgrades
  stable var nextId : Nat = 22;
  stable var nextOrderId : Nat = 1;
  stable var razorpayKeyId : ?Text = null;
  stable var upiId : ?Text = ?"8961492669@jio";

  // Stable backing arrays for Maps/Lists
  stable var flavorsEntries : [(Nat, IceCreamFlavor)] = [];
  stable var ordersEntries : [(Nat, Order)] = [];
  stable var contactMessagesArray : [ContactMessage] = [];
  stable var userProfilesEntries : [(Principal, UserProfile)] = [];

  // Runtime Maps rebuilt from stable storage
  let flavors = Map.empty<Nat, IceCreamFlavor>();
  let orders = Map.empty<Nat, Order>();
  let contactMessages = List.empty<ContactMessage>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Restore from stable storage on upgrade
  for ((k, v) in flavorsEntries.values()) {
    flavors.add(k, v);
  };
  for ((k, v) in ordersEntries.values()) {
    orders.add(k, v);
  };
  for (msg in contactMessagesArray.values()) {
    contactMessages.add(msg);
  };
  for ((k, v) in userProfilesEntries.values()) {
    userProfiles.add(k, v);
  };


  // Upgrade hooks - serialize to stable storage before upgrade
  system func preupgrade() {
    flavorsEntries := flavors.entries().toArray();
    ordersEntries := orders.entries().toArray();
    contactMessagesArray := contactMessages.toArray();
    userProfilesEntries := userProfiles.entries().toArray();
  };

  system func postupgrade() {
    // Data already restored from stable arrays in actor body above.
    // Clear stable arrays to free memory (data is now in Maps).
    flavorsEntries := [];
    ordersEntries := [];
    contactMessagesArray := [];
    userProfilesEntries := [];
    // Clear migrated legacy stable var
    sampleFlavors := [];
  };

  // Helper function
  func getFlavorInternal(id : Nat) : IceCreamFlavor {
    switch (flavors.get(id)) {
      case (null) { Runtime.trap("Flavor not found") };
      case (?flavor) { flavor };
    };
  };

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

  // Public read functions
  public query func getAllFlavors() : async [IceCreamFlavor] {
    flavors.values().toArray().sort(IceCreamFlavor.compareByName);
  };

  public query func getAvailableFlavors() : async [IceCreamFlavor] {
    flavors.values().toArray().filter(func(flavor) { flavor.isAvailable }).sort(IceCreamFlavor.compareByName);
  };

  public query func getFeaturedFlavors() : async [IceCreamFlavor] {
    flavors.values().toArray().filter(func(flavor) { flavor.isFeatured }).sort(IceCreamFlavor.compareByName);
  };

  public query func getFlavorsByCategory(category : Text) : async [IceCreamFlavor] {
    flavors.values().toArray().filter(func(flavor) { flavor.category == category }).sort(IceCreamFlavor.compareByName);
  };

  public query func searchFlavors(searchTerm : Text) : async [IceCreamFlavor] {
    let term = searchTerm.toLower();
    flavors.values().toArray().filter(func(flavor) {
      flavor.name.toLower().contains(#text term) or flavor.description.toLower().contains(#text term)
    }).sort(IceCreamFlavor.compareByName);
  };

  public query func getFlavor(id : Nat) : async IceCreamFlavor {
    getFlavorInternal(id);
  };

  // Flavor Management - security handled by frontend password gate
  public shared func addFlavor(flavorInput : IceCreamFlavorInput) : async Nat {
    let flavor : IceCreamFlavor = {
      flavorInput with
      id = nextId;
    };
    flavors.add(nextId, flavor);
    nextId += 1;
    flavor.id;
  };

  public shared func updateFlavor(id : Nat, input : IceCreamFlavorUpdate) : async () {
    let flavor = getFlavorInternal(id);
    let updatedFlavor : IceCreamFlavor = {
      id = flavor.id;
      name = switch (input.name) {
        case (null) { flavor.name };
        case (?name) { name };
      };
      description = switch (input.description) {
        case (null) { flavor.description };
        case (?desc) { desc };
      };
      price = switch (input.price) {
        case (null) { flavor.price };
        case (?price) { price };
      };
      category = switch (input.category) {
        case (null) { flavor.category };
        case (?cat) { cat };
      };
      imageUrl = switch (input.imageUrl) {
        case (null) { flavor.imageUrl };
        case (newUrl) { newUrl };
      };
      isAvailable = switch (input.isAvailable) {
        case (null) { flavor.isAvailable };
        case (?avail) { avail };
      };
      isFeatured = switch (input.isFeatured) {
        case (null) { flavor.isFeatured };
        case (?featured) { featured };
      };
    };
    flavors.add(id, updatedFlavor);
  };

  public shared func deleteFlavor(id : Nat) : async () {
    if (not flavors.containsKey(id)) {
      Runtime.trap("Flavor not found");
    };
    flavors.remove(id);
  };


  public shared func clearAllFlavors() : async () {
    let ids = flavors.keys().toArray();
    for (id in ids.values()) {
      flavors.remove(id);
    };
    nextId := 1;
  };

  public shared func toggleAvailability(id : Nat) : async () {
    let flavor = getFlavorInternal(id);
    let updatedFlavor : IceCreamFlavor = {
      flavor with
      isAvailable = not flavor.isAvailable;
    };
    flavors.add(id, updatedFlavor);
  };

  public shared func toggleFeatured(id : Nat) : async () {
    let flavor = getFlavorInternal(id);
    let updatedFlavor : IceCreamFlavor = {
      flavor with
      isFeatured = not flavor.isFeatured;
    };
    flavors.add(id, updatedFlavor);
  };

  // Contact Messages
  public shared (_) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
    let contactMessage : ContactMessage = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactMessages.add(contactMessage);
  };

  public query func getAllContactMessages() : async [ContactMessage] {
    contactMessages.toArray();
  };

  public shared func deleteContactMessage(timestamp : Time.Time) : async () {
    let remaining = contactMessages.filter(func(m : ContactMessage) : Bool { m.timestamp != timestamp });
    contactMessages.clear();
    contactMessages.addAll(remaining.values());
  };

  // Order Functions
  public shared (_) func placeOrder(
    customerName : Text,
    customerPhone : Text,
    deliveryAddress : Text,
    items : [OrderItem],
    totalAmount : Float,
    razorpayOrderId : Text,
    razorpayPaymentId : Text,
  ) : async Nat {
    let order : Order = {
      id = nextOrderId;
      customerName;
      customerPhone;
      deliveryAddress;
      items;
      totalAmount;
      status = "confirmed";
      timestamp = Time.now();
      razorpayOrderId;
      razorpayPaymentId;
    };
    orders.add(nextOrderId, order);
    nextOrderId += 1;
    order.id;
  };

  public query func getOrders() : async [Order] {
    orders.values().toArray();
  };

  public query func getOrdersByPhone(phone : Text) : async [Order] {
    orders.values().toArray().filter(func(o) { o.customerPhone == phone });
  };

  public shared func updateOrderStatus(id : Nat, status : Text) : async () {
    switch (orders.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder : Order = { order with status };
        orders.add(id, updatedOrder);
      };
    };
  };

  public shared func deleteOrder(id : Nat) : async () {
    if (not orders.containsKey(id)) {
      Runtime.trap("Order not found");
    };
    orders.remove(id);
  };

  // Payment Settings
  public shared func setRazorpayKeyId(key : Text) : async () {
    razorpayKeyId := ?key;
  };

  public query func getRazorpayKeyId() : async ?Text {
    razorpayKeyId;
  };

  public shared func setUpiId(id : Text) : async () {
    upiId := ?id;
  };

  public query func getUpiId() : async ?Text {
    upiId;
  };
};
