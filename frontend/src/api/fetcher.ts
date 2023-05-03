const fetcher = (url: string) =>
  fetch(`http://127.0.0.1:8000/${url}`).then((response) =>
    response.ok
      ? response.json()
      : response.json().then((json) => {
          throw new Error(json);
        })
  )

export default fetcher