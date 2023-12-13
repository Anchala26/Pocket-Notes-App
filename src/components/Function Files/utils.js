export const noteLogo = (groupName) => {
  if (typeof groupName !== "string" || !groupName.trim()) {
    // Return a default logo or handle the case as needed
    return { logo: "DEFAULT" };
  }
  const words = groupName.trim().split(/\s+/);
  return {
    logo: words
      .slice(0, 2)
      // .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase(),
  };
};
