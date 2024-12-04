<script>
  import { page } from '$app/stores';
  import '../app.css';

  const status = $page.status;
  const message = $page.error?.message;
</script>

<div class="flex h-full flex-col items-center justify-center bg-black text-4xl text-white">
  <a href="/" class="underline">Back to home</a>

  <img
    class="h-[30rem]"
    src="https://http.dog/{$page.status}.jpg"
    alt="{status}. {message}"
    srcset=""
  />
</div>
