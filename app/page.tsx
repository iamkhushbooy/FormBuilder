'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import Footer from './_components/Footer'
export type fieldType = {
  label: string,
  type: 'text' | 'number' | 'email' | 'password' | 'file',
  id: number
}
const page = () => {
  const [field, setField] = useState<fieldType[]>([]);
  const [isSaving, setIsSaving] = useState(true);
  const [email,setEmail]=useState('')
  // useEffect(() => {
  //   console.log(field);
  // }, [field])
  const addField = () => {
    const f: fieldType = {
      label: 'newfield',
      type: 'text',
      id: Date.now()
    }
    const updatedfield: fieldType[] = [...field, f]
    setField(updatedfield)
  }
  const removeField = (e: number) => {
    const updatedField = field.filter((item, index) => (item.id !== e))
    setField(updatedField);

  }
  const changeLabel = (iid: number, l: fieldType['label']) => {
    const updatedField = field.map((item, index) => (item.id == iid ?
      { ...item, label: l } : item
    ))
    setField(updatedField)
  }
  const changeType = (iid: number, t: fieldType['type']) => {
    const updatedField = field.map((item, index) => (item.id === iid ?
      { ...item, type: t } : item))
    setField(updatedField)

  }
  const save = () => {
    localStorage.setItem('Field', JSON.stringify(field))
    alert("Your data has been saved")
    setIsSaving(false)
  }
  useEffect(() => {
    let f = localStorage.getItem('Field')
    if (f) {
      const parsedField = JSON.parse(f)
      setField(parsedField)
    }
  }, [])
  const saveDBandMail = async () => {
    const res = await axios.post('api/save', {
      field,email
    })
    alert('link generated')

    // console.log(res.data);
  }
  return (
    <>
    <Header></Header>
    <div className='w-full h-[90vh] flex justify-center
    items-center flex-col
   '>
      <div id='main' className='w-[90%] h-[80%] 
        overflow-scroll overflow-x-hidden bg-gray-100 border rounded'>
        <div className="sticky top-0 bg-gray-100">
          <h1 className='font-bold text-[25px] mx-4 sticky top-4'>
            Start Here...</h1>
          <button onClick={addField} className='text-[18px] mx-4 
                    mt-8
                   bg-blue-400 hover:bg-blue-500 text-white font-semibold 
                     py-2 px-4 rounded-full'>
            Add New Field
          </button>
        </div>
        {field.map((item, index) => (
          <div key={item.id} className='mx-[10%] my-4 w-[80%] h-auto bg-gray-200 border 
            rounded flex-col'>
            <input
              value={item.label}
              onChange={e => changeLabel(item.id, e.target.value)}
              className='mx-[15%] mt-4 w-[70%] h-[40px] rounded-md border
             border-gray-300 bg-blue-50 p-2 focus:ring-2 
             focus:ring-blue-100 focus:border-blue-100 focus:outline-none
              transition duration-200 ease-in-out'
              type='text' placeholder={item.label} />
            <select
              className='mx-[15%] mt-4 w-[70%] h-[40px] rounded border p-2'
              value={item.type}
              onChange={e => changeType(item.id, e.target.value as fieldType['type'])}
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
            </select>
            <button
              onClick={() => removeField(item.id)}
              className='w-[70%] h-[40px] text-[18px] mx-[15%] mt-4 mb-4
                         bg-red-400 hover:bg-red-500 text-white font-semibold rounded-full'>
              Remove Field
            </button>
          </div>
        ))}

      </div>
      {
        isSaving?
        <button onClick={save}
          className='w-[150px] h-[40px] mx-3 text-[18px] bg-green-500
             hover:bg-green-600
             text-white font-semibold rounded'>Save
        </button>
        :
        <div className='flex justify-center items-center w-[80%] h-[100px]'>
           <input 
           value={email}
           onChange={e=>setEmail(e.target.value)}
           type="text" placeholder='Enter your email...'
            className='mx-[2px] w-[220px] h-[40px] rounded-md border
            border-gray-300 bg-blue-50 p-2 focus:ring-2 
            focus:ring-blue-100 focus:border-blue-100 focus:outline-none
             transition duration-200 ease-in-out'
           />
        <button onClick={saveDBandMail}
        className='w-[140px] h-[50px] mx-3 text-[18px] bg-green-500
             hover:bg-green-600
             text-white font-semibold rounded'>Generate mail link
      </button>
        </div>
       
      }
    </div>
    <Footer></Footer>
    </>
  )
}


export default page