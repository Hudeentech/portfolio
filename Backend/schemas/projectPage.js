export default {
  name: 'projectPage',
  title: 'ProjectPage',
  type: 'document',
  fields: [
    {
      name: 'projectName',
      title: 'Project Name',
      type: 'string',
    },
    {
      name: 'desc',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'imageUrl',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'github',
      title: 'GitHub Link',
      type: 'url',
    },
    {
      name: 'demoLink',
      title: 'Demo Link',
      type: 'url',
    },
    {
      name: 'behance',
      title: 'Behance Link',
      type: 'url',
    },

    {
      name: 'case',
      title: "My Case Study",
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    
    {
      name: 'overview',
      title: 'Overview',
      type: 'array',
      of: [{type: 'block'}],
    },

    {
      name: 'case2',
      title: "My Case Study2",
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'conclusion',
      title: 'conclusion',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'tag',
      title: 'Tag',
      type: 'string',
      options: {
        list: [
          { title: 'UI', value: 'ui' },
          { title: 'Web', value: 'web' },
          { title: 'App', value: 'app' },
        ],
      },
    },
  ],
};
