  Feature: Form Validation
    User will enter name & email, click next, then user will choose between ps4 & xbox and then..

    Background: Go to Form Page
     Given I go to "http://www.way2automation.com/angularjs-protractor/multiform/#/form/profile"

    Scenario: Validate Name & Email Entry Page
      When I enter "Limmy" for field "formData.name"
      When I enter "lim@gmail.com" for field "formData.email"
      Then field "pre.ng-binding" contains "{\"name\":\"Limmy\",\"email\":\"lim@gmail.com\"}"
      And I click a button
      When I select the option with value "xbox"
      And I click a button

    Scenario Outline: Validate Entire Form
      #Enter name & email
      When I enter "<name>" for field "<nameField>"
      And I enter "<email>" for field "<emailField>"
      And I click a button
      #Select ps4 or xbox
      When I select the option with value "xbox"
      And I click a button
      #Submit & validate submition
      And I click a button
      Then the alert should read "awesome!"
      #Validation
      Then field "<logField>" contains '<logContent>'

      Examples:
      | name  | nameField     | email         | emailField     | logContent                                           | logField       |
      | Jimmy | formData.name | jim@gmail.com | formData.email |{"name":"Jimmy","email":"jim@gmail.com","type":"xbox"}| pre.ng-binding |
      | Timmy | formData.name | tim@gmail.com | formData.email|{"name":"Timmy","email":"tim@gmail.com","type":"xbox"}  | pre.ng-binding |