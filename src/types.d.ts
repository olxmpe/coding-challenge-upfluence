type PostTypeCount = Record<string, number>;
type PostData = Record<string, PostTypeCount>;
type PostType = {
  label: string;
  value: string;
  count: number;
};
