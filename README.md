Instructions for running project locally : 
1. npm install
2. npm run dev
3. npm run cypress

Description : 

I called graphql api on pageload to load all of the country details and when user typed in country code, I am again
calling api. There can be other ways also like to fetch all data once, store them in redux store and then retrieve specific 
country details as per user inputted country code. As redux was not mentioned in problem statement so I havn't used that 
and keep the solution simple to demonstrate my understanding of react, react hooks, typescript, graphql.

I have also followed TDD approach and have written cypress test cases. 

***** If redux is required then please let me know. I can also make this solution using redux.

Note : This is an error at console. It may be due to some version conflicts of material-table and material-ui/core npm packages. I am working on resolving this error.

1. Prop `style` did not match. Server: "box-sizing:border-box;width:calc((0px - (0px)) / 2)" Client: "box-sizing:border-box;width:calc((0px - (0px + calc((100% - (0px)) / 2) + calc((100% - (0px)) / 2))) / 2)"
    at th
    at TableCell

2. There is also one warning related to findDomNode deprecation, pagination. These are also due to version conflicts.