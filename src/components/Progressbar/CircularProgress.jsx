import React from 'react'
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularProgress({Title,value,maxValue,DetailText,BgColor,trailColor}) {
    return ( 
        <div className={` ${BgColor} mx-2  p-4 rounded-lg flex items-center `}>
            <div className='w-[60px] '>
                <CircularProgressbar value={value} maxValue={maxValue} strokeWidth={5} 
                text={value + ' / ' + maxValue}
                        styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            rotation: 0.25,
                        
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'butt',
                        
                            // Text size
                            textSize: '20px',
                        
                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 0.5,
                        
                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',
                        
                            // Colors
                            pathColor: trailColor,
                            textColor: '#ffffff',
                            
                            trailColor: '#ffffff',
                            backgroundColor: '#3e98c7',
                          })}
                />
            </div>
            <div className='ml-5'>
                <p className='text-sm text-white'>{Title}</p>
           
               
            </div>

        </div>
     );
}

export default CircularProgress;