'use client'
import React, { useEffect, useState } from 'react'
import { fieldType } from '@/app/page'
import axios from 'axios'
import { useParams } from 'next/navigation'
export type submitType={
    key:string,
    value:number|string
}
const Page = () => {
    const param = useParams();
    const { id } = param;
    // console.log(id);
    const [field, setField] = useState<fieldType[]>([])
    const [email,setEmail]=useState('')
    const getField = async () => {
        const res = await fetch(`/api/form/${id}`,{
           cache: 'force-cache'
        })
        const j=await res.json();
        setField(j.data.fields)
        setEmail(j.data.email)
        console.log(j.data);
    }
    useEffect(() => {
        getField();
    }, [])
  


  
   
    const [fieldsave,setFieldsave]=useState<submitType[]>([])
    const setLabel=()=>{
        const newData=field.map((item,index)=>(
            {
                key:item.label,
                value:''
            }
        ))
       setFieldsave(newData);
    }
    useEffect(() => {
        setLabel();
    }, [field])
   
    const submitForm=async()=>{
        // console.log(fieldsave);
        const res=await axios.post('/api/submit',{ 
            fieldsave,email,_id:id
        })  
        alert('your response has been submitted')
    }
    const clearForm = () => {
        const clearedFields = fieldsave.map(item => ({
            ...item, value: ''
        }));
        setFieldsave(clearedFields);
    };
    return (
        <div className='w-full min-h-screen flex justify-center 
        items-center flex-col bg-[#efebf9]'>
            <div className='w-[100%] min-h-screen mt-5 
                flex justify-center items-center flex-col'>
                {field.map((item, index) => (
                    <div key={index} className='rounded-lg w-[80%] h-[150px] 
                        flex flex-col border my-5 bg-[#ffffff]'>
                        <p className='text-[20px] mx-5 mt-5'>
                            {item.label}
                        </p>
                        <input
                        value={fieldsave[index]?fieldsave[index].value:''}
                        onChange={e=>{
                            const updatedfield=[...fieldsave]
                            updatedfield[index].value=e.target.value
                            setFieldsave(updatedfield)

                        }}
                        placeholder='Your answer' className='w-[90%] 
                        h-[35px] border-b-2 p-2 focus:border-b-blue-600 
                        duration-300 focus:outline-none m-5'
                            type={item.type} />
                    </div>
                ))}
            </div>
            <div className='w-[80%] h-[80px] flex items-center
               justify-between text-purple-900  font-medium'>
                <button onClick={submitForm} className='mx-2 text-[20px] px-5 text-white
                 bg-purple-800
                 hover:bg-purple-900 rounded-md p-2'>
                    Submit
                </button>
                <button onClick={clearForm}>Clear form</button>
            </div>
                <p className='p-3'>This form is created by {email}</p>
                <footer className='font-extralight p-1'>This website created by 
                Khushboo</footer>
               
           
            
        </div>
    )
}

export default Page;
