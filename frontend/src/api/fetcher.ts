const fetcher = (url: string) => fetch(`http://127.0.0.1:8000/${url}`).then(response => response.json())

export default fetcher;