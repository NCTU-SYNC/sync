export interface IPost {
  _id: number;
  title: string;
  category: string;
  createdAt: string;
  isPopular: boolean;
  editingCount: number;
  editedCount: number;
  content: IPostContent;
}

/*
export interface INewPost {
  id: number;
  title: string;
  tags: string[];
  excerpt: string;
  quotes: string[];
  category: string;
  createdAt: string;
  isPopular: boolean;
  editing: boolean;
  editCount: number;
}
*/
export interface IPostContent {
  tags: Array<string>;
  blocks: IPostContentObject[];
  entityMap: any;
  timeStamp: string;
}

export interface IPostContentObject {
  data: object,
  depth: number;
  entityRanges: string[],
  inlineStyleRanges: IPostContentInlineStyle[],
  key: string;
  text: string;
  type: string;
}

interface IPostContentInlineStyle {
  length: number,
  offset: number,
  style: string,
}
