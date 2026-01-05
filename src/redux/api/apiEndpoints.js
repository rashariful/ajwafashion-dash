const apiEndpoints = {
  auth: {
    login: "/auth/login",
    changePassword: "/auth/change-password",
    forgotPassword: "/auth/forget-password",
    resetPassword: "/auth/reset-password",
  },
  user: {
    admin: "/users/admin",
    vendor: "/users/vendor",
    customer: "/users/customer",
    myInfo: "/auth/me",
  },

  admin: {
    all: "/admins",
    withId: (id) => `/admins/${id}`,
  },

  // Reall api end point
  banner: {
    all: "/banner",
    withId: (id) => `/banner/${id}`,
  },
  keyPoint: {
    all: "/keypoint",
    withId: (id) => `/keypoint/${id}`,
  },
  order: {
    all: "/orders",
    withId: (id) => `/orders/${id}`,
  },
  product: {
    all: "/product",
    withId: (id) => `/product/${id}`,
  },
  promotion: {
    all: "/promotion",
    withId: (id) => `/promotion/${id}`,
  },
};

export const {
  admin,
  user,
  auth,
  vendor,
  banner,
  keyPoint,
  order,
  product,
  promotion,
} = apiEndpoints;
