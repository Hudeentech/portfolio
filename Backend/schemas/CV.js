export default {
  name: 'cv',
  title: 'CV',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'resume',
      title: 'Resume',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx',
      },
    },
  ],
};