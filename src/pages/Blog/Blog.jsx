import React from 'react';

const Blog = () => {
    return (
        <>
            <h1 className='text-center font-bold text-5xl my-20'>All Blogs</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 p-5'>
                <div>
                    <h3 className='text-2xl'>What are the different ways to manage a state in a React application?</h3>
                    <p>
                        There are four main types of state you need to properly manage in your React apps:
                        <li>Local state</li>
                        <li>Global state</li>
                        <li>Server state</li>
                        <li>URL state</li>
                    </p>
                </div>
                <div>
                    <h3 className='text-2xl'>How does prototypical inheritance work?</h3>
                    <p>
                        Prototypical inheritance allows us to reuse the properties or methods from one JavaScript object to another through a reference pointer function. All JavaScript objects inherit properties and methods from a prototype: Date objects inherit from Date.Apr
                    </p>
                </div>
                <div>
                    <h3 className='text-2xl'>What is a unit test? Why should we write unit tests?</h3>
                    <p>
                        The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                    </p>
                </div>
                <div>
                    <h3 className='text-2xl'>React vs. Angular vs. Vue?</h3>
                    <p>
                        Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Blog;