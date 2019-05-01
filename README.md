# test-cypress-course

Launching cypress:

 Warning

Cypress could not verify that the server set as your baseUrl is running: http://localhost:8080

Because I didn't have my dockers up. Awesome!

Also automatically warns you about:

1. any JavaScript errors in the website
2. if a button or element is offscreen (e.g. you have to scroll to see it) - not sure how you set the viewport?

Debugging is amazing - but it still seems tricky to grab a value of a variable from the code and display it on screen... although can just do console.log

Loving jquery selectors!

Needed to install 'sudo apt install libgconf-2-4' on Ubuntu to get it working in CI (travis) - see pipeline

For some reason, the check for the 'product-details' page happens too fast on the CI pipeline and needed to be commented out in the 'edit product' test...

Checking that the product isn't no longer in the list doesn't work if there are duplicate products. Had to remove it for the reliability test. This is because Cypress can't loop with the 'before and after' actions inside the loop as well as the test. I think protractor also couldnt loop with the before and after inside and they needed to be added to the test?