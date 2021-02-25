import axios from 'axios'

async function fetchData() {
    const req = await axios.get("http://localhost:4000/app/users");
    console.log(req)
}

fetchData();
