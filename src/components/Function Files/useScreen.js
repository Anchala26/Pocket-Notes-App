import { useMediaQuery } from "react-responsive";

export const useScreen = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return { isMobile };
};
