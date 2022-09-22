//AXIOS Global

axios.defaults.headers.common['X-Auth-token']=
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

// GET REQUEST
function getTodos() {
  console.log('GET Request');
  // axios({
  //   method:'get',
  //   url:'https://jsonplaceholder.typicode.com/todos',
  //   params:{
  //     _limit:5
  //   }
  // })
  // .then(res=>showOutput(res))
  // .catch(err=>console.log(err))

  //similar way
  axios
  .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then(res=>showOutput(res))
  .catch(err=>console.log(err))
}

// POST REQUEST
function addTodo() {
  console.log('POST Request');
  axios
  .post('https://jsonplaceholder.typicode.com/todos',{
    title:'New Todo',
    completed:'false'
  })
  .then(res=>showOutput(res))
  .catch(err=>console.log(err))
}

// PUT/PATCH REQUEST
function updateTodo() {
  console.log('PUT/PATCH Request');
  axios
  .patch('https://jsonplaceholder.typicode.com/todos/1',{
    title:'update to do',
    completed:'false'
  })
  .then(res=>showOutput(res))
  .catch(err=>console.log(err))
}

// DELETE REQUEST
function removeTodo() {
  console.log('DELETE Request');
  axios
  .delete('https://jsonplaceholder.typicode.com/todos/1')
  .then(res=>showOutput(res))
  .catch(err=>console.log(err))
}

// SIMULTANEOUS DATA
function getData() {
  console.log('Simultaneous Request');
  axios
  .all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])
  .then(axios.spread((todos,posts)=>showOutput(posts)))
  .catch(err=>console.log(err))

}

// CUSTOM HEADERS
function customHeaders() {
  console.log('Custom Headers');

  const config={
    headers:{
      'Content-Type':'application/json',
      Authorixation:'sometoken'
    }
  }

  axios
  .post('https://jsonplaceholder.typicode.com/todos',{
    title:'New Todo',
    completed:'false'
  },config)
  .then(res=>showOutput(res))
  .catch(err=>console.log(err))

}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');

  const option={
    method:'post',
    url:'https://jsonplaceholder.typicode.com/todos',
    data:{
      title:'Hello World'
    },
    transformResponse: axios.defaults.transformResponse.concat(data=>{
      data.title=data.title.toUpperCase();
      return data;
    })

  }
  axios(option).then(res=>showOutput(res))
}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
  axios
  .get('https://jsonplaceholder.typicode.com/todoss')
  .then(res=>showOutput(res))
  .catch(error=>{
    if(error.response){
      //Server responded with syatus other than 200
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  }

   
  )
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');

  const source=axios.CancelToken.source()

  axios
  .get('https://jsonplaceholder.typicode.com/todos',{
    cancelToken: source.token
  })
  .then(res=>showOutput(res))
  .catch(thrown=>{

    if(axios.isCancel(thrown)){

      console.log('Request canceled', thrown.message);
    }
  });
  if(true){
    source.cancel('request canceled');
  }
}

// INTERCEPTING REQUESTS & RESPONSES

axios.interceptors.request.use(
  config=>{
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);

  return config
}, erorr=>{
  return Promise.reject(erorr)
})

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
