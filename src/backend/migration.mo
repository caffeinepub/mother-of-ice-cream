import Map "mo:core/Map";
import Time "mo:core/Time";
import Float "mo:core/Float";
import Principal "mo:core/Principal";

module {
  // ── Old types (from previous version) ──────────────────────────────────────

  type OldOrderItem = {
    flavorId : Nat;
    flavorName : Text;
    quantity : Nat;
    price : Float;
  };

  type OldOrder = {
    id : Nat;
    customerName : Text;
    customerPhone : Text;
    deliveryAddress : Text;
    items : [OldOrderItem];
    totalAmount : Float;
    status : Text;
    timestamp : Time.Time;
    razorpayOrderId : Text;
    razorpayPaymentId : Text;
  };

  type OldUserProfile = { name : Text };

  type OldIceCreamFlavor = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    imageUrl : ?Text;
    isAvailable : Bool;
    isFeatured : Bool;
  };

  type OldContactMessage = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  // Old authorization state shape (from local authorization module)
  type OldUserRole = { #admin; #user; #guest };
  type OldAccessControlState = {
    var adminAssigned : Bool;
    userRoles : Map.Map<Principal, OldUserRole>;
  };

  type OldActor = {
    var sampleFlavors : [OldIceCreamFlavor];
    var nextId : Nat;
    var nextOrderId : Nat;
    var razorpayKeyId : ?Text;
    var upiId : ?Text;
    var flavorsEntries : [(Nat, OldIceCreamFlavor)];
    var ordersEntries : [(Nat, OldOrder)];
    var contactMessagesArray : [OldContactMessage];
    var userProfilesEntries : [(Principal, OldUserProfile)];
    accessControlState : OldAccessControlState;
    orders : Map.Map<Nat, OldOrder>;
    flavors : Map.Map<Nat, OldIceCreamFlavor>;
  };

  // ── New types ───────────────────────────────────────────────────────────────

  type NewOrder = {
    id : Nat;
    customerName : Text;
    customerPhone : Text;
    deliveryAddress : Text;
    items : [OldOrderItem];
    totalAmount : Float;
    status : Text;
    timestamp : Time.Time;
    utrReference : Text;
    paymentMethod : Text;
  };

  type NewActor = {
    var sampleFlavors : [OldIceCreamFlavor];
    var nextId : Nat;
    var nextOrderId : Nat;
    var upiId : ?Text;
    var flavorsEntries : [(Nat, OldIceCreamFlavor)];
    var ordersEntries : [(Nat, NewOrder)];
    var contactMessagesArray : [OldContactMessage];
    var userProfilesEntries : [(Principal, OldUserProfile)];
    orders : Map.Map<Nat, NewOrder>;
    flavors : Map.Map<Nat, OldIceCreamFlavor>;
  };

  func migrateOrder(k : Nat, o : OldOrder) : NewOrder {
    {
      id = o.id;
      customerName = o.customerName;
      customerPhone = o.customerPhone;
      deliveryAddress = o.deliveryAddress;
      items = o.items;
      totalAmount = o.totalAmount;
      status = o.status;
      timestamp = o.timestamp;
      utrReference = o.razorpayOrderId;
      paymentMethod = "online";
    };
  };

  public func run(old : OldActor) : NewActor {
    // Migrate orders Map
    let migratedOrders = old.orders.map<Nat, OldOrder, NewOrder>(migrateOrder);

    // Migrate ordersEntries array
    let migratedOrdersEntries : [(Nat, NewOrder)] = old.ordersEntries.map<(Nat, OldOrder), (Nat, NewOrder)>(
      func(entry : (Nat, OldOrder)) : (Nat, NewOrder) {
        (entry.0, migrateOrder(entry.0, entry.1));
      }
    );

    {
      var sampleFlavors = old.sampleFlavors;
      var nextId = old.nextId;
      var nextOrderId = old.nextOrderId;
      var upiId = old.upiId;
      var flavorsEntries = old.flavorsEntries;
      var ordersEntries = migratedOrdersEntries;
      var contactMessagesArray = old.contactMessagesArray;
      var userProfilesEntries = old.userProfilesEntries;
      orders = migratedOrders;
      flavors = old.flavors;
    };
  };
};
