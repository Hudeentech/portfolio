import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId:'w7mopn6h',
    dataset: 'production',
    apiVersion: '2022-02-01',
    useCdn: true,
    token: 'skpZ70hlKxvxI6QOXIECVjj5kaG6ZZ3ZsesGviV9AFqCArJno1NmdqGePu3YvVbVBDEzmpRmis968hrqDtOo0sCbe4GijpKPdcIvU52e4pnpA2wUHyzB59O6y5nmheGESvjCzle0rwPySOsGe4pR4ihWpz0GZVAHdS4Zhgjeu6MxwHfOUmf7',
  });
  
  const builder = imageUrlBuilder(client);

  export const urlFor = (source) => builder.image(source);