var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { ab as Subscribable, ac as shallowEqualObjects, ad as hashKey, ae as getDefaultState, af as notifyManager, ag as useQueryClient, r as reactExports, ah as noop, ai as shouldThrowError, aj as useActor, ak as useQuery } from "./index-pbtFoexA.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
          _a2,
          action.data,
          variables,
          onMutateResult,
          context
        );
        (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
          _c,
          action.data,
          null,
          variables,
          onMutateResult,
          context
        );
      } else if ((action == null ? void 0 : action.type) === "error") {
        (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
          _e,
          action.error,
          variables,
          onMutateResult,
          context
        );
        (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
          _g,
          void 0,
          action.error,
          variables,
          onMutateResult,
          context
        );
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
function useAllFlavors() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["flavors", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllFlavors();
    },
    enabled: !!actor && !isFetching
  });
}
function useFeaturedFlavors() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["flavors", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedFlavors();
    },
    enabled: !!actor && !isFetching
  });
}
function useFlavorsByCategory(category) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["flavors", "category", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "All") return actor.getAllFlavors();
      return actor.getFlavorsByCategory(category);
    },
    enabled: !!actor && !isFetching
  });
}
function useContactMessages() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactMessages();
    },
    enabled: !!actor && !isFetching
  });
}
function useAddFlavor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      if (!actor) throw new Error("Not connected");
      return actor.addFlavor(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flavors"] });
    }
  });
}
function useUpdateFlavor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      update
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateFlavor(id, update);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flavors"] });
    }
  });
}
function useDeleteFlavor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteFlavor(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flavors"] });
    }
  });
}
function useToggleAvailability() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.toggleAvailability(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flavors"] });
    }
  });
}
function useToggleFeatured() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.toggleFeatured(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flavors"] });
    }
  });
}
function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactMessage(name, email, message);
    }
  });
}
function useGetOrders() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOrders();
    },
    enabled: !!actor && !isFetching
  });
}
function useGetRazorpayKey() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["razorpayKey"],
    queryFn: async () => {
      if (!actor) return null;
      const result = await actor.getRazorpayKeyId();
      return Array.isArray(result) && result.length > 0 ? result[0] : null;
    },
    enabled: !!actor && !isFetching
  });
}
function useSetRazorpayKey() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (key) => {
      if (!actor) throw new Error("Not connected");
      return actor.setRazorpayKeyId(key);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["razorpayKey"] });
    }
  });
}
function useUpdateOrderStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });
}
function useDeleteOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteOrder(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });
}
function useDeleteContactMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (timestamp) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteContactMessage(timestamp);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contactMessages"] });
    }
  });
}
export {
  useAllFlavors as a,
  useFlavorsByCategory as b,
  useSubmitContact as c,
  useContactMessages as d,
  useAddFlavor as e,
  useUpdateFlavor as f,
  useDeleteFlavor as g,
  useToggleAvailability as h,
  useToggleFeatured as i,
  useDeleteOrder as j,
  useDeleteContactMessage as k,
  useGetOrders as l,
  useUpdateOrderStatus as m,
  useGetRazorpayKey as n,
  useSetRazorpayKey as o,
  useFeaturedFlavors as u
};
