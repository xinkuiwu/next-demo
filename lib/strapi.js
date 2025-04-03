export async function getAllNotes() {
  const response = await fetch(`http://localhost:1337/api/notes`,{
    method: 'GET',
    headers: {
      Authorization: 'bearer f5eb09c22fb7db2b08cdbf82a8b228245eb309ede22bb1a4c32d37f4d828728c10df68188a5f1f43eaf79408207d4769377eabe2e6081ed0206ee21f4cf5a8bc56a383717aa683da1fe52e91c19bacadc37b9f5b4db820f6ecf5147ce6f0a5eee463fc38875b2b3da309d49db8ec8d1a0c1b2277ac4b1b34b3143b6923789f9d',
      "Content-Type": "application/json"
    },
  })
  const data = await response.json();

  const res = {};

  data?.data?.forEach(( {title, content, slug, updatedAt}) => {
    res[slug] = JSON.stringify({
      title,
      content,
      updateTime: updatedAt
    })
  })

  return res
}

export async function addNote(data) {
  const response = await fetch(`http://localhost:1337/api/notes`, {
    method: 'POST',
    headers: {
      Authorization: 'bearer f5eb09c22fb7db2b08cdbf82a8b228245eb309ede22bb1a4c32d37f4d828728c10df68188a5f1f43eaf79408207d4769377eabe2e6081ed0206ee21f4cf5a8bc56a383717aa683da1fe52e91c19bacadc37b9f5b4db820f6ecf5147ce6f0a5eee463fc38875b2b3da309d49db8ec8d1a0c1b2277ac4b1b34b3143b6923789f9d',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: JSON.parse(data)
    })
  })
  const res = await response.json();
  return res.data.attributes.slug
}

export async function updateNote(uuid, data) {
  const {id} = await getNote(uuid);
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: 'bearer f5eb09c22fb7db2b08cdbf82a8b228245eb309ede22bb1a4c32d37f4d828728c10df68188a5f1f43eaf79408207d4769377eabe2e6081ed0206ee21f4cf5a8bc56a383717aa683da1fe52e91c19bacadc37b9f5b4db820f6ecf5147ce6f0a5eee463fc38875b2b3da309d49db8ec8d1a0c1b2277ac4b1b34b3143b6923789f9d',
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: JSON.parse(data)
    })
  })
  const res = await response.json()
}

export async function getNote(uuid) {
  const response = await fetch(`http://localhost:1337/api/notes?filters[slug][$eq]=${uuid}`,{
    method: 'GET',
    headers: {
      Authorization: 'bearer f5eb09c22fb7db2b08cdbf82a8b228245eb309ede22bb1a4c32d37f4d828728c10df68188a5f1f43eaf79408207d4769377eabe2e6081ed0206ee21f4cf5a8bc56a383717aa683da1fe52e91c19bacadc37b9f5b4db820f6ecf5147ce6f0a5eee463fc38875b2b3da309d49db8ec8d1a0c1b2277ac4b1b34b3143b6923789f9d',
      "Content-Type": "application/json"
    }
  })
  const data = await response.json();
  return {
    title: data.data[0].attributes.title,
    content: data.data[0].attributes.content,
    updateTime: data.data[0].attributes.updatedAt,
    id: data.data[0].id
  }
}

export async function delNote(uuid) {
  const {id} = await getNote(uuid);
  const response = await fetch(`http://localhost:1337/api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'bearer f5eb09c22fb7db2b08cdbf82a8b228245eb309ede22bb1a4c32d37f4d828728c10df68188a5f1f43eaf79408207d4769377eabe2e6081ed0206ee21f4cf5a8bc56a383717aa683da1fe52e91c19bacadc37b9f5b4db820f6ecf5147ce6f0a5eee463fc38875b2b3da309d49db8ec8d1a0c1b2277ac4b1b34b3143b6923789f9d',
      "Content-Type": "application/json"
    }
  })
  const res = await response.json()
}

