import type { ImgHTMLAttributes } from "react";

type Props = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "aria-hidden" | "role"
>;

/**
 * An image that's purely decoration (GIF flourishes, icons beside a text
 * label). Always renders alt="" and aria-hidden="true" so screen readers skip
 * it. The empty alt is deliberate: leaving alt off entirely makes some screen
 * readers read the file name, and fails accessibility checks.
 *
 * For an image that carries meaning (a logo, a photo), use a plain <img> with
 * real alt text instead.
 */
export function DecorativeImage(props: Props) {
  return <img {...props} alt="" aria-hidden="true" />;
}
