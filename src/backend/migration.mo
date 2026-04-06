import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Float "mo:core/Float";
import List "mo:core/List";
import Principal "mo:core/Principal";

module {
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

  type OrderItem = {
    flavorId : Nat;
    flavorName : Text;
    quantity : Nat;
    price : Float;
  };

  type Order = {
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

  type UserProfile = {
    name : Text;
  };

  type OldActor = {
    var nextId : Nat;
    var nextOrderId : Nat;
    var razorpayKeyId : ?Text;
    var upiId : ?Text;
    flavors : Map.Map<Nat, IceCreamFlavor>;
    orders : Map.Map<Nat, Order>;
    contactMessages : List.List<ContactMessage>;
    userProfiles : Map.Map<Principal.Principal, UserProfile>;
  };

  type NewActor = {
    var nextId : Nat;
    var nextOrderId : Nat;
    var razorpayKeyId : ?Text;
    var upiId : ?Text;
    flavors : Map.Map<Nat, IceCreamFlavor>;
    orders : Map.Map<Nat, Order>;
    contactMessages : List.List<ContactMessage>;
    userProfiles : Map.Map<Principal.Principal, UserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    old;
  };
};
