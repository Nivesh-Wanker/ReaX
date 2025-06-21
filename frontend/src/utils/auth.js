export const extractToken = (headers) => {
    const auth = headers?.authorization || headers?.Authorization;
    return auth?.startsWith("Bearer ") ? auth.split(" ")[1] : null;
  };
  