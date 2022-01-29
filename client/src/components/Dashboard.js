  
  import {useState, useEffect} from 'react'
  import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
          const history = useNavigate()
       const [userData, setUserData] = useState();
       const [loading, setLoading] = useState(true)
       const [task, setTask] = useState( {
           title:"", desc:"", startDate: "", endDate: ""
       })
    const fetchUserData = async () => {
        
         try{
        
            const fetchData = await fetch( "http://localhost:1337/api/dashboard", {
                method: "GET",
                headers: {    
                  "Content-Type": "application/json"
              },
              credentials: "include"
                       
            })
              let response  = await fetchData.json();
              if(response){
                   setUserData(response) 
                   setLoading(false)
              }
              else{
                  console.log("no data from server")
              }
              
        } catch(err){
            console.log(err)
            history('/login')
        }
        
     
    }

    const handleInputs =(e) => {
    
        setTask({...task, [e.target.name]:e.target.value});
    }
    
    const postTask = async (e) => {
        e.preventDefault()

        const { title, desc, startDate, endDate} = task
         
        const postTasks = await fetch('http://localhost:1337/api/task', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                title, desc, startDate, endDate
            })
        })

        try{
            if(postTasks.status === 400 || !postTasks) {
              
              window.alert("not task added");
            }
            else{
              window.alert("task added succesfull");
              fetchUserData()
            }
        
          } catch(error) {
               console.log(error)
          }

    }
     

    useEffect( ()=> {
        fetchUserData()
    }, [])

    if (loading) {
        return (
            <div className='load'>
                <h1>Loading...</h1>
            </div>
        )
  }

    return (
        <>
        <div className="container">
           <h1 className="text-center">Welcome {userData ? userData.name : null}</h1>
              Add Task
           <div className="">

          <form method='POST'>

              <div className="d-flex flex-column">
               <div className="mb-1 mt-1">
                <label htmlFor="title" className="form-label">Title:</label>
                <input type="text" className="form-control" id="title"
                   value={task.title}
                   onChange={handleInputs}
                placeholder="Enter title" name="title" />
               </div>

               <div>
                  <label htmlFor="desc">Description:</label>
                  <textarea className="form-control" rows="3" id="desc"
                     value={task.desc}
                     onChange={handleInputs}
                  name="desc"></textarea>
               </div>
               <div className="mb-1 mt-1 row">
                  <div className="col">
                  <label htmlFor="startDate" className="form-label">Start Date:</label>
                <input type="date" className="form-control" id="startDate"
                   value={task.startDate}
                   onChange={handleInputs}
                placeholder="Enter starting date"
                 name="startDate" />
                  </div>
                   <div className="col">
                   <label htmlFor="endDate" className="form-label">End Date:</label>
                <input type="date" className="form-control" id="endDate"
                   value={task.endDate}
                   onChange={handleInputs}
                placeholder="Enter end date"
                 name="endDate" />
                   </div>
                
               </div>
              
           
                <div>
                <button type="submit" 
                  onClick={(e) => postTask(e)}
                className="btn btn-primary ">Submit</button>
                </div>

                </div>
            </form>
          </div>
          

          <h1 className="text-center">All Tasks</h1>
         <div className="d-flex flex-column">
         
         {
              userData.tasks.map( (data, key) =>{
                  return (
                      <>
                      <div  className='d-flex flex-column'>
               <div >
                   Title: {data.title}
               </div>
               <div >
                   Description: {data.desc}
               </div>
               <div>
                   Creation Date: {data.creationDate}
               </div>
               <div>
                   Starting Date: {data.startDate}
               </div>
               <div>
                   Ending Date: {data.endDate}
               </div>
           </div>
                      </>
                  )
              } )  
              }

           

           
         </div>

        </div>
        </>
    )

}

export default Dashboard