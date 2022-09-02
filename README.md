# calculator
An online calculator web app
(Only UI is ready at the moment)

work in progress: delete key; 

known bugs:
1. clicking on delete button img may result in  unexpected behaviour
	(planned to fix with ending touches in css)
2. if no operator is choosen after "=", then it ignores next numString
	(planned to fix with equals key reimplimentations)
3. if clicking any operator or deleteKey in initial stage return "total = NaN"

goals:
1. delete key logic,
2. all clear key logic,
3. add new key (+/-)
4. map keys with keyboard
5. round numbers upto a fixed decimal fraction
6. click sounds

refactor ideas:
1. merge "accept first value negative bugfix" with (+/-) key impelmentation
2. equals key implementation
