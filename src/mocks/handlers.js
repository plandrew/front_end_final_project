import { http, HttpResponse } from 'msw';
import { mockPosts } from '../features/Home/mockPosts';
import { mockSubreddits } from '../features/Header/mockSubreddits'

export const handlers = [
    http.get('https://www.reddit.com/r/pics.json', ({ request }) => {
        return HttpResponse.json(mockPosts)
      }),
    http.get('https://www.reddit.com/subreddits.json', ({ request }) => {
      return HttpResponse.json(mockSubreddits)
    }),
];

 

