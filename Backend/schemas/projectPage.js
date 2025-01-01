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
      type: 'text',
    },
    {
      name: 'imageUrl',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enable image cropping
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
        ], // Add more tags if necessary
      },
    },
  ],
};
