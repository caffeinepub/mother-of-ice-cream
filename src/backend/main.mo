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

  // State
  var nextId = 1;
  var nextOrderId = 1;
  var razorpayKeyId : ?Text = null;

  let flavors = Map.empty<Nat, IceCreamFlavor>();
  let contactMessages = List.empty<ContactMessage>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let orders = Map.empty<Nat, Order>();

  // Seed sample flavors
  let sampleFlavors = [
    {
      id = 1;
      name = "Vanilla";
      description = "Classic vanilla ice cream.";
      price = 80.0;
      category = "Classic";
      imageUrl = null;
      isAvailable = true;
      isFeatured = true;
    },
    {
      id = 2;
      name = "Chocolate";
      description = "Rich chocolate ice cream.";
      price = 80.0;
      category = "Classic";
      imageUrl = null;
      isAvailable = true;
      isFeatured = true;
    },
    {
      id = 3;
      name = "Strawberry";
      description = "Fresh strawberry ice cream.";
      price = 80.0;
      category = "Classic";
      imageUrl = null;
      isAvailable = true;
      isFeatured = false;
    },
    {
      id = 4;
      name = "Mango Sorbet";
      description = "Vegan mango sorbet.";
      price = 90.0;
      category = "Vegan";
      imageUrl = null;
      isAvailable = true;
      isFeatured = false;
    },
    {
      id = 5;
      name = "Coconut";
      description = "Creamy coconut ice cream.";
      price = 90.0;
      category = "Premium";
      imageUrl = null;
      isAvailable = true;
      isFeatured = false;
    },
    {
      id = 6;
      name = "Pumpkin Spice";
      description = "Seasonal pumpkin spice flavor.";
      price = 100.0;
      category = "Seasonal";
      imageUrl = null;
      isAvailable = false;
      isFeatured = false;
    },
    {
      id = 7;
      name = "Mint Chocolate Chip";
      description = "Mint ice cream with chocolate chips.";
      price = 90.0;
      category = "Classic";
      imageUrl = null;
      isAvailable = true;
      isFeatured = false;
    },
    {
      id = 8;
      name = "Raspberry Sorbet";
      description = "Vegan raspberry sorbet.";
      price = 90.0;
      category = "Vegan";
      imageUrl = null;
      isAvailable = true;
      isFeatured = false;
    },
    {
      id = 9;
      name = "Rainbow Sherbet";
      description = "A swirly, vibrant blend of fruity rainbow flavors — bright, refreshing, and impossible to resist.";
      price = 120.0;
      category = "Premium";
      imageUrl = ?"/assets/generated/rainbow-sherbet.dim_600x600.jpg";
      isAvailable = true;
      isFeatured = true;
    },
    {
      id = 10;
      name = "Special of the Day";
      description = "Our chef's seasonal creation — a limited-edition scoop made with the freshest ingredients of the season.";
      price = 130.0;
      category = "Seasonal";
      imageUrl = ?"/assets/img-20260406-wa0000-019d6174-18d6-704c-951e-02bfcabea472.jpg";
      isAvailable = true;
      isFeatured = true;
    },
    {
      id = 11;
      name = "Mango Delight";
      description = "Luscious Alphonso mango ice cream bursting with real mango chunks and tropical sweetness.";
      price = 120.0;
      category = "Premium";
      imageUrl = ?"/assets/generated/mango-icecream.dim_400x400.jpg";
      isAvailable = true;
      isFeatured = true;
    },
    {
      id = 12;
      name = "Chocolate Fudge";
      description = "Intense dark chocolate fudge ice cream with rich swirls of cocoa goodness in every bite.";
      price = 100.0;
      category = "Classic";
      imageUrl = ?"/assets/generated/chocolate-fudge-icecream.dim_400x400.jpg";
      isAvailable = true;
      isFeatured = true;
    },
    {
      id = 13;
      name = "Strawberry Delight";
      description = "Fresh Kolkata strawberries blended into a silky smooth ice cream with real fruit pieces.";
      price = 90.0;
      category = "Classic";
      imageUrl = ?"/assets/generated/strawberry-delight-icecream.dim_400x400.jpg";
      isAvailable = true;
      isFeatured = false;
    },
    {
      id = 14;
      name = "Pistachio Royale";
      description = "Premium Iranian pistachio ice cream loaded with crushed pistachios for a truly royal experience.";
      price = 150.0;
      category = "Premium";
      imageUrl = ?"/assets/generated/pistachio-royale-icecream.dim_400x400.jpg";
      isAvailable = true;
      isFeatured = true;
    },
    {
      id = 15;
      name = "Rose Gulkand";
      description = "A delicate rose petal and gulkand flavored ice cream — a classic Bengali summer treat.";
      price = 110.0;
      category = "Seasonal";
      imageUrl = ?"/assets/generated/rose-gulkand-icecream.dim_400x400.jpg";
      isAvailable = true;
      isFeatured = false;
    },
    {
      id = 16;
      name = "Vanilla Flower Cone";
      description = "Creamy classic vanilla ice cream served on a crispy waffle cone, decorated with edible flower petals.";
      price = 80.0;
      category = "Classic";
      imageUrl = ?"/assets/generated/vanilla-flower-cone.dim_400x400.jpg";
      isAvailable = true;
      isFeatured = true;
    },
    {
      id = 17;
      name = "Mango Blossom";
      description = "Vibrant golden mango ice cream infused with tropical blossom flavors — bursting with sweet summer sunshine.";
      price = 120.0;
      category = "Premium";
      imageUrl = ?"/assets/generated/mango-blossom.dim_400x400.jpg";
      isAvailable = true;
      isFeatured = true;
    },
    {
      id = 18;
      name = "Strawberry Bloom";
      description = "Bright pink strawberry ice cream with real strawberry pieces and a beautiful flower garnish on top.";
      price = 90.0;
      category = "Classic";
      imageUrl = ?"/assets/generated/strawberry-bloom.dim_400x400.jpg";
      isAvailable = true;
      isFeatured = false;
    },
    {
      id = 19;
      name = "Chocolate Scoop";
      description = "Indulgent dark chocolate ice cream with rich chocolate shavings — the ultimate treat for chocolate lovers.";
      price = 80.0;
      category = "Classic";
      imageUrl = ?"/assets/generated/chocolate-icecream.dim_400x400.jpg";
      isAvailable = true;
      isFeatured = false;
    },
    {
      id = 20;
      name = "Black Currant";
      description = "Deep purple-black black currant ice cream packed with real berries for a bold and tangy experience.";
      price = 100.0;
      category = "Premium";
      imageUrl = ?"/assets/generated/black-currant-icecream.dim_400x400.jpg";
      isAvailable = true;
      isFeatured = true;
    },
    {
      id = 21;
      name = "Butterscotch";
      description = "Golden butterscotch ice cream with caramel drizzle and crunchy butterscotch chips in every bite.";
      price = 90.0;
      category = "Classic";
      imageUrl = ?"/assets/generated/butterscotch-icecream.dim_400x400.jpg";
      isAvailable = true;
      isFeatured = true;
    },
  ];

  for (flavor in sampleFlavors.values()) {
    flavors.add(flavor.id, flavor);
    nextId += 1;
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public Functions
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

  // Admin Functions (no login required)
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

  // Razorpay Key Management
  public shared func setRazorpayKeyId(key : Text) : async () {
    razorpayKeyId := ?key;
  };

  public query func getRazorpayKeyId() : async ?Text {
    razorpayKeyId;
  };
};
