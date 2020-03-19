import { IPostContent } from '~/modules/post/interface/IPost';

export default 
{
  tags: [ '武漢肺炎', '陳時中' ],
  entityMap: [],
  timeStamp: '2020-03-17T11:22:00.294+00:00',
  blocks: [
    {
      data: {},
      depth: 0,
      entityRanges: [],
      inlineStyleRanges: [
        {
          length: 3,
          offset: 0,
          style: 'UNDERLINE',
        },
        {
          length: 3,
          offset: 3,
          style: 'ITALIC',
        }
      ],
      key: '52kt4',
      text: 'sss',
      type: 'unstyled',
    },
    {
      data: {},
      depth: 0,
      entityRanges: [],
      inlineStyleRanges: [],
      key: '155fv',
      text: 'ddd',
      type: 'unstyled',
    },
  ]
} as IPostContent;
