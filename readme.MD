
# Firestore Database
- users (collection)
	- user (doc)
		- id
		- name
- lighters (collection)
	- lighter (doc)
		- number
		- color
		- description
		- date_added
		- added_by (user id)
		- lost_by (user id or null)
		- transactions (collection)
			- transaction (doc)
				- given_to (user id)
				- date