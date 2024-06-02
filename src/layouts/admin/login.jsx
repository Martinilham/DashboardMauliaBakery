import React, { useState ,useEffect} from 'react';
import { useNavigate , Link } from 'react-router-dom'
import axios from "axios"

function Login() {

  const [nama,setnama] = useState("")
  const [password,setpassword] = useState("")
  const navigate = useNavigate();

  
const ambiluser = () => {
    axios
    .get('https://maulia-bakeryserver.vercel.app/daftar')
    .then((res) => {
        console.log(res.data)
    })
}

useEffect(() => {
  ambiluser()
}, [])



const handleLogin =  async (event) => {
  event.preventDefault();
  try {
      const response = await axios
      .post('https://maulia-bakeryserver.vercel.app/login', { nama, password })
      const token = response.data.token
      alert('Login successful')
      setnama('')
      setpassword('')
      ambiluser();
      if(response.data.isAdmin){
        navigate("/admin")
      }
      window.location.reload();
      localStorage.setItem('token', token)
  } catch (error) {
      alert('Login gagal')
      console.log('Login Error', error)
  }
}

  return (
<div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        class="relative flex flex-col m-8 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
      >
        {/* <!-- left side --> */}
        <form onSubmit={handleLogin}>
        <div class="flex flex-col justify-center p-8 md:p-14">
          <span class="mb-3 text-4xl font-bold">ADMIN LOGIN</span>
          <span class="font-light text-gray-400 mb-8">
            Silakan Masukan nama dan password
          </span>
          <div class="py-4">
            <span class="mb-2 text-md">Username</span>
            <input
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              placeholder="rahma"
              value={nama}
              onChange={(e) => setnama(e.target.value)}
            />
          </div>
          <div class="py-4">
            <span class="mb-2 text-md">Password</span>
            <input
              type="password"
              name="pass"
              id="pass"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              placeholder="wer1234ui"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div class="flex justify-between w-full py-2">
            <span class="font-bold text-md"><Link>Lupa password</Link></span>
          </div>
          <div class="border-2 text-center border-blue-600 rounded-lg px-3 py-2 text-blue-400 cursor-pointer hover:bg-blue-600 hover:text-blue-100">
          <button
            type='submit'
          >Login</button> 
        </div>

        </div>
        </form>
        
        <div class="relative">
          <img
            src="/images/avatars/roti.jpg"
            alt="img"
            class="w-[400px] h-full hidden rounded-r-2xl md:block  object-fill"
          />
         
          {/* <div
            class="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
          >
            <span class="text-white text-xl"
              ><br />start every new project
              and can't <br />imagine working without it."
            </span>
          </div> */}
        </div>
      </div>
    </div>
  )
}


export default Login;
