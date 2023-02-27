
const exercise= require('../exercise/exercise1');
require('jest');

describe('fizzBusy',()=>{
    it('should throw if input is not number',()=>{
        const args=[null,'a','',undefined,{}];
        args.forEach(ar => {
            expect(()=>{exercise.fizzBuzz(ar) }).toThrow();
        });
          })

          it('should return FizzBuzz if input divisible by 3 and 5',()=>{
const result=exercise.fizzBuzz(15);
expect(result).toBe('FizzBuzz');

            
          })

          it('should return Fizz if input divisible by 3 ',()=>{
            const result=exercise.fizzBuzz(9);
            expect(result).toBe('Fizz');
              
       })

                      it('should return Fizz if input divisible by 5 ',()=>{
                        const result=exercise.fizzBuzz(10);
                        expect(result).toBe('Buzz');
                        
                                    
                                  })

                                  it('should return input if input isnot divisible by 3 or 5 ',()=>{
                                    const result=exercise.fizzBuzz(7);
                                    expect(result).toBe(7);
                                    
                                                
                                              })
})