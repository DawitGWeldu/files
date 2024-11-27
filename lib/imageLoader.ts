export default function imageLoader({
    src,
    width,
  }: {
    src: string;
    width: number;
  }) {
    if (process.env.NODE_ENV !== "production") {
      return `${src}?w=${width}&q=75`;
    }
    return `https://ittihadagency.com/${src}?w=${width}&q=75`;
  }