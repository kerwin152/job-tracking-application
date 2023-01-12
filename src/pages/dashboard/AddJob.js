import { useDispatch, useSelector } from 'react-redux';
import { FormRow,FormRowSelect } from '../../components';
import { toast } from 'react-toastify';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { handleChange, clearValues, createJob, editJob } from '../../features/job/jobSlice';
import { useEffect } from 'react';
import userEvent from '@testing-library/user-event';

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    jobType,
    statusOptions,
    status,
    isEditing,
    editJobId,
  } = useSelector((store)=>store.job);
  const dispatch = useDispatch();

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(!position || !company || !jobLocation){
      toast.error('Please Fill Out All Fields');
      return
    }
    if(isEditing){
      dispatch(editJob({
        jobId:editJobId,
        job:{position, company, jobLocation, jobType, status},}
        ))
      return;
    }
    dispatch(createJob({position,company,jobLocation,jobType,status}));
  };

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({name,value}));
  };

  const {user} = useSelector((store)=>store.user);

  useEffect(()=> {
    if(!isEditing){
      dispatch(handleChange({name:'jobLocation',value:user.location}))
    }
  }, []);

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>{isEditing?'edit job':'add job'}</h3>
        <div className='form-center'>
            <FormRow
                type='text' 
                name='position' 
                value={position} 
                handleChange={handleJobInput} 
            />
            <FormRow
                type='text' 
                name='company' 
                value={company} 
                handleChange={handleJobInput} 
            />
            <FormRow
                type='text' 
                name='jobLocation'
                labelText='job location'
                value={jobLocation} 
                handleChange={handleJobInput} 
            />
            {/* status */}
            <FormRowSelect 
              name='status'
              value={status}
              handleChange={handleJobInput}
              list={statusOptions}
            />
            {/* job type */}
            <FormRowSelect 
              name='jobType'
              labelText='job type'
              value={jobType}
              handleChange={handleJobInput}
              list={jobTypeOptions}
            />

            <div className='btn-container'>
              <button type='button' className='btn btn-block clear-btn' onClick={()=>dispatch(clearValues())}>
                  clear
              </button>
              <button type='submit' className='btn btn-block submit-btn' disabled={isLoading}>
                {isLoading?'Please Wait...':'Submit'}
              </button>
            </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
