
var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
console.log(baseUrl)

// AXIOS functions:
axios.baseUrl = baseUrl

async function get_identity_from_server(){
  try{
    const response = await axios.get('/identity/');
      return Promise.resolve(response)
    } catch (error) {
      console.error(error);
      return Promise.resolve(error)
    }
}

async function get_models_from_server(){
  try{
    const response = await axios.get('/models/');
      return Promise.resolve(response)
    } catch (error) {
      console.error(error);
      return Promise.resolve(error)
    }
}

// Vue
function set_online_status(status){
  online_status.status = status
}

function set_name_of_node(name){
  name_of_node.name = name
}

function set_models_in_table(models){
  models_list.models = models
}

// VUE OBJECT BINDING:
var models_list = new Vue({
  el: '#m-for-models-list',
  delimiters : ['[[', ']]'],
  data: {
    models: ["Hello","12"]
  }
})

var name_of_node = new Vue({ 
  el: '#name_of_node',
  delimiters : ['[[', ']]'],
  data: {
      name: ""
  }
});

var online_status = new Vue({ 
  el: '#online_status',
  delimiters : ['[[', ']]'],
  data: {
      status: ""
  }
});

// MAIN LOGIC
async function update_server_status(){
  // just doing a identity check to see if server is online
  var identity = await get_identity_from_server()
  console.log(identity)
  if(identity["data"] == "OpenGrid"){
    set_online_status("Online")
    set_name_of_node("Bob")
  }else{
    set_online_status("Offline")
  }
  //set_online_status(identity)
}

async function update_models_list(){
  var response = await get_models_from_server()
  set_models_in_table(response["data"]["models"])
}

async function sync_with_server(){
  console.log("syncing with server")
  await update_server_status()
  await update_models_list()
  setTimeout(sync_with_server, 5000)
}

sync_with_server()