import React from 'react'
import { CircularProgressbar,buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularProgress({Title,value,maxValue,DetailText,BgColor,trailColor}) {
    return ( 
        <div className={`border ${BgColor} mx-2 w-[300px] p-4 rounded-lg flex `}>
            <div className='w-[200px] '>
                <CircularProgressbar value={value} maxValue={maxValue} strokeWidth={4} 
                text={value + ' / ' + maxValue}
                        styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            rotation: 0.25,
                        
                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            strokeLinecap: 'butt',
                        
                            // Text size
                            textSize: '15px',
                        
                            // How long animation takes to go from one percentage to another, in seconds
                            pathTransitionDuration: 0.5,
                        
                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',
                        
                            // Colors
                            pathColor: `rgba(255,255,255, ${100 / 100})`,
                            textColor: '#ffffff',
                            
                            trailColor: trailColor,
                            backgroundColor: '#3e98c7',
                          })}
                />
            </div>
            <div className='ml-5'>
                <p className='text-lg text-white'>{Title}</p>
                <p className='w-full text-[13px] text-white'>{DetailText}</p>
               
            </div>

        </div>
     );
}

export default CircularProgress;