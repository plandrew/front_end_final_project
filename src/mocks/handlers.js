import { http, HttpResponse } from 'msw';
import { mockPosts } from '../features/Home/mockPosts';

export const handlers = [
    http.get('https://www.reddit.com/r/pics.json', ({ request }) => {
        console.log(mockPosts);
        return HttpResponse.json(mockPosts)
      }),
];

 

