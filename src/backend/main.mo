import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Float "mo:core/Float";
import Principal "mo:core/Principal";


actor {
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

  // Old order type - matches previous stable shape for compatibility
  type OrderV1 = {
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

  public type Order = {
    id : Nat;
    customerName : Text;
    customerPhone : Text;
    deliveryAddress : Text;
    items : [OrderItem];
    totalAmount : Float;
    status : Text;
    timestamp : Time.Time;
    utrReference : Text;
    paymentMethod : Text;
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

  // Legacy user role type — must match old stable accessControlState
  type UserRole = { #admin; #guest; #user };

  // Migration stubs for removed stable variables — must match old types exactly
  // accessControlState was non-optional in old version, keep as non-optional for compat
  stable var accessControlState : {
    var adminAssigned : Bool;
    userRoles : Map.Map<Principal, UserRole>;
  } = {
    var adminAssigned = false;
    userRoles = Map.empty<Principal, UserRole>();
  };

  // Legacy orders map — matches old stable 'orders' type for upgrade compatibility
  // (--default-persistent-actors makes let declarations implicitly stable)
  let orders : Map.Map<Nat, OrderV1> = Map.empty<Nat, OrderV1>();

  // Explicit migration: preserve old stable vars
  stable var sampleFlavors : [IceCreamFlavor] = [];

  // Migration stub: razorpayKeyId was removed; keep declaration so stable
  // compatibility check passes — value is never read or written.
  stable var razorpayKeyId : ?Text = null;

  // Stable state
  stable var nextId : Nat = 22;
  stable var nextOrderId : Nat = 1;
  stable var upiId : ?Text = ?"8961492669@jio";

  // Stable backing arrays
  stable var flavorsEntries : [(Nat, IceCreamFlavor)] = [];
  stable var ordersEntries : [(Nat, OrderV1)] = [];
  stable var ordersEntriesV2 : [(Nat, Order)] = [];
  stable var contactMessagesArray : [ContactMessage] = [];
  stable var userProfilesEntries : [(Principal, UserProfile)] = [];

  // Runtime Maps
  let flavors = Map.empty<Nat, IceCreamFlavor>();
  let ordersV2 = Map.empty<Nat, Order>();
  let contactMessages = List.empty<ContactMessage>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Restore from stable storage on upgrade
  for ((k, v) in flavorsEntries.values()) {
    flavors.add(k, v);
  };
  // Migrate old orders (V1) to V2
  for ((k, v) in orders.entries()) {
    let migrated : Order = {
      id = v.id;
      customerName = v.customerName;
      customerPhone = v.customerPhone;
      deliveryAddress = v.deliveryAddress;
      items = v.items;
      totalAmount = v.totalAmount;
      status = v.status;
      timestamp = v.timestamp;
      utrReference = v.razorpayPaymentId;
      paymentMethod = "online";
    };
    ordersV2.add(k, migrated);
  };
  // Migrate legacy ordersEntries (V1 array) to V2
  for ((k, v) in ordersEntries.values()) {
    let migrated : Order = {
      id = v.id;
      customerName = v.customerName;
      customerPhone = v.customerPhone;
      deliveryAddress = v.deliveryAddress;
      items = v.items;
      totalAmount = v.totalAmount;
      status = v.status;
      timestamp = v.timestamp;
      utrReference = v.razorpayPaymentId;
      paymentMethod = "online";
    };
    ordersV2.add(k, migrated);
  };
  // Restore new-format orders
  for ((k, v) in ordersEntriesV2.values()) {
    ordersV2.add(k, v);
  };
  for (msg in contactMessagesArray.values()) {
    contactMessages.add(msg);
  };
  for ((k, v) in userProfilesEntries.values()) {
    userProfiles.add(k, v);
  };

  // Upgrade hooks
  system func preupgrade() {
    flavorsEntries := flavors.entries().toArray();
    ordersEntries := [];
    ordersEntriesV2 := ordersV2.entries().toArray();
    contactMessagesArray := contactMessages.toArray();
    userProfilesEntries := userProfiles.entries().toArray();
  };

  system func postupgrade() {
    flavorsEntries := [];
    ordersEntries := [];
    ordersEntriesV2 := [];
    contactMessagesArray := [];
    userProfilesEntries := [];
    sampleFlavors := [];

    // Seed the menu with 13 products if it is currently empty
    if (flavors.size() == 0) {
      let seedData : [(Nat, IceCreamFlavor)] = [
        (1, { id = 1; name = "BANANA SPLIT"; description = "VANILLA, CHOCOLATE, STRAWBERRY"; price = 100.0; category = "Classic"; imageUrl = ?"/assets/generated/banana-split.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
        (2, { id = 2; name = "COLA FLOAT"; description = "WITH ICE-CREAM"; price = 110.0; category = "Classic"; imageUrl = ?"/assets/generated/cola-float.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
        (3, { id = 3; name = "COLD COFFEE"; description = "With ICE-CREAM"; price = 110.0; category = "Classic"; imageUrl = ?"/assets/generated/cold-coffee-icecream.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
        (4, { id = 4; name = "Chocolate"; description = "Rich chocolate ice cream."; price = 80.0; category = "Classic"; imageUrl = ?"/assets/generated/chocolate-icecream.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
        (5, { id = 5; name = "FRESH LIME"; description = "SODA WITH MINT"; price = 40.0; category = "Classic"; imageUrl = ?"/assets/generated/fresh-lime-soda.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
        (6, { id = 6; name = "Fruit Salad"; description = "With ice cream"; price = 120.0; category = "Classic"; imageUrl = ?"/assets/generated/fruit-salad-icecream.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
        (7, { id = 7; name = "Hot Chocolate FUDGE"; description = "Rich hot chocolate fudge sundae."; price = 140.0; category = "Classic"; imageUrl = ?"/assets/generated/hot-chocolate-fudge.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
        (8, { id = 8; name = "ORANGE BLOSSOM"; description = "MOCKTAIL"; price = 90.0; category = "Premium"; imageUrl = ?"/assets/generated/orange-blossom-mocktail.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
        (9, { id = 9; name = "PINEAPPLE BLOSSOM"; description = "MOCKTAIL"; price = 70.0; category = "Premium"; imageUrl = ?"/assets/generated/pineapple-blossom-mocktail.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
        (10, { id = 10; name = "Special of the Day"; description = "Our chef's seasonal creation — a limited-edition scoop made with the freshest ingredients of the season."; price = 130.0; category = "Seasonal"; imageUrl = ?"/assets/generated/special-of-the-day.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
        (11, { id = 11; name = "Tutti Frutti"; description = "VANILLA, strawberry & Fresh Fruits"; price = 100.0; category = "Classic"; imageUrl = ?"/assets/generated/tutti-frutti.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
        (12, { id = 12; name = "VANILLA"; description = "WITH HOT CHOCOLATE SAUCE"; price = 70.0; category = "Classic"; imageUrl = ?"/assets/generated/vanilla-hot-chocolate-sauce.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
        (13, { id = 13; name = "Vanilla"; description = "Classic vanilla ice cream."; price = 60.0; category = "Classic"; imageUrl = ?"/assets/generated/vanilla-classic.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
      ];
      for ((k, v) in seedData.values()) {
        flavors.add(k, v);
      };
      nextId := 14;
    };
  };

  public shared func seedDefaultFlavors() : async Nat {
    if (flavors.size() > 0) {
      return 0;
    };
    let seedData : [(Nat, IceCreamFlavor)] = [
      (1, { id = 1; name = "BANANA SPLIT"; description = "VANILLA, CHOCOLATE, STRAWBERRY"; price = 100.0; category = "Classic"; imageUrl = ?"/assets/generated/banana-split.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
      (2, { id = 2; name = "COLA FLOAT"; description = "WITH ICE-CREAM"; price = 110.0; category = "Classic"; imageUrl = ?"/assets/generated/cola-float.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
      (3, { id = 3; name = "COLD COFFEE"; description = "With ICE-CREAM"; price = 110.0; category = "Classic"; imageUrl = ?"/assets/generated/cold-coffee-icecream.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
      (4, { id = 4; name = "Chocolate"; description = "Rich chocolate ice cream."; price = 80.0; category = "Classic"; imageUrl = ?"/assets/generated/chocolate-icecream.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
      (5, { id = 5; name = "FRESH LIME"; description = "SODA WITH MINT"; price = 40.0; category = "Classic"; imageUrl = ?"/assets/generated/fresh-lime-soda.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
      (6, { id = 6; name = "Fruit Salad"; description = "With ice cream"; price = 120.0; category = "Classic"; imageUrl = ?"/assets/generated/fruit-salad-icecream.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
      (7, { id = 7; name = "Hot Chocolate FUDGE"; description = "Rich hot chocolate fudge sundae."; price = 140.0; category = "Classic"; imageUrl = ?"/assets/generated/hot-chocolate-fudge.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
      (8, { id = 8; name = "ORANGE BLOSSOM"; description = "MOCKTAIL"; price = 90.0; category = "Premium"; imageUrl = ?"/assets/generated/orange-blossom-mocktail.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
      (9, { id = 9; name = "PINEAPPLE BLOSSOM"; description = "MOCKTAIL"; price = 70.0; category = "Premium"; imageUrl = ?"/assets/generated/pineapple-blossom-mocktail.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
      (10, { id = 10; name = "Special of the Day"; description = "Our chef's seasonal creation — a limited-edition scoop made with the freshest ingredients of the season."; price = 130.0; category = "Seasonal"; imageUrl = ?"/assets/generated/special-of-the-day.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
      (11, { id = 11; name = "Tutti Frutti"; description = "VANILLA, strawberry & Fresh Fruits"; price = 100.0; category = "Classic"; imageUrl = ?"/assets/generated/tutti-frutti.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
      (12, { id = 12; name = "VANILLA"; description = "WITH HOT CHOCOLATE SAUCE"; price = 70.0; category = "Classic"; imageUrl = ?"/assets/generated/vanilla-hot-chocolate-sauce.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
      (13, { id = 13; name = "Vanilla"; description = "Classic vanilla ice cream."; price = 60.0; category = "Classic"; imageUrl = ?"/assets/generated/vanilla-classic.dim_400x400.jpg"; isAvailable = true; isFeatured = true }),
    ];
    for ((k, v) in seedData.values()) {
      flavors.add(k, v);
    };
    nextId := 14;
    return 13;
  };

  func getFlavorInternal(id : Nat) : IceCreamFlavor {
    switch (flavors.get(id)) {
      case (null) { Runtime.trap("Flavor not found") };
      case (?flavor) { flavor };
    };
  };

  public query func getCallerUserProfile() : async ?UserProfile {
    null;
  };

  public query func getUserProfile(_ : Principal) : async ?UserProfile {
    null;
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    userProfiles.add(caller, profile);
  };

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

  public shared (_) func placeOrder(
    customerName : Text,
    customerPhone : Text,
    deliveryAddress : Text,
    items : [OrderItem],
    totalAmount : Float,
    utrReference : Text,
    paymentMethod : Text,
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
      utrReference;
      paymentMethod;
    };
    ordersV2.add(nextOrderId, order);
    nextOrderId += 1;
    order.id;
  };

  public query func getOrders() : async [Order] {
    ordersV2.values().toArray();
  };

  public query func getOrdersByPhone(phone : Text) : async [Order] {
    ordersV2.values().toArray().filter(func(o) { o.customerPhone == phone });
  };

  public shared func updateOrderStatus(id : Nat, status : Text) : async () {
    switch (ordersV2.get(id)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        let updatedOrder : Order = { order with status };
        ordersV2.add(id, updatedOrder);
      };
    };
  };

  public shared func deleteOrder(id : Nat) : async () {
    if (not ordersV2.containsKey(id)) {
      Runtime.trap("Order not found");
    };
    ordersV2.remove(id);
  };

  public shared func setUpiId(id : Text) : async () {
    upiId := ?id;
  };

  public query func getUpiId() : async ?Text {
    upiId;
  };

  public query func isCallerAdmin() : async Bool {
    false;
  };
};
