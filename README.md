# calculator
An online calculator web app
(Prototype almost ready for touch devices)

work in progress: delete key;

known bugs:
1. clicking on delete button img may result in  unexpected behaviour
	(planned to fix with ending touches in css)
2. if no operator is choosen after "=", then it ignores next numString
	(planned to fix with equals key reimplimentations)
3. if clicking any operator or deleteKey in initial stage return "total = NaN"

goals:
1. all clear key logic,
2. add new key (+/-)
3. map keys with keyboard
4. round numbers upto a fixed decimal fraction
5. click sounds

refactoring required:
1. merge "accept first value negative bugfix" with (+/-) key impelmentation
2. equals key implementation
