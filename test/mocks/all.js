export const user = {
	uid: 'Fsdky41hjdasdk',
	displayName: 'John Doe',
	email: 'john@gmail.com',
	emailVerified: true,
	isAnonymous: false,
	photoURL: 'http://gridgum.com/templates/free-themes/store/images/testimonials/1.jpg',
	refreshToken: '!kljfsdlDASK',
}

export const action = {
	action_type: 'ADD_ELEMENT'
}

export const action2 = {
	action_type: 'ORDER_ELEMENT'
}

export const state = [
	{
		"id": 1,
		"parent_id": 0,
		"elementType": "view",
		"style": {"color": "green", order: 1},
		"childIds": [2],
		"data": {"mode_id": 0}
	},
	{"id": 2, "parent_id": 1, "elementType": "text", "style": {"color": "green", order: 1}, "data": {"mode_id": 0}},
	{"id": 3, "parent_id": 0, "elementType": "text", "style": {"color": "green", order: 2}, "data": {"mode_id": 0}}
];

export const stateObj = {
	'1': {
		childIds: [2],
		elementType: 'view',
		id: 1,
		parent_id: 0,
		style: {color: 'green', order: 1},
		data: {mode_id: 0}
	},
	'2': {
		elementType: 'text',
		id: 2,
		parent_id: 1,
		style: {color: 'green', order: 1},
		data: {mode_id: 0}
	},
	'3': {
		elementType: 'text',
		id: 3,
		parent_id: 0,
		style: {color: 'green', order: 2},
		data: {mode_id: 0}
	}
};

export const stateRoot = {
	"-JOqvmqmKK81t0p09tJ2": {
		"id": 1,
		"parent_id": 0,
		"elementType": "view",
		"style": {"color": "green", order: 1},
		"childIds": [2]
	},
	"-JOqvmqmKK81t0p09tJ3": {"id": 2, "parent_id": 1, "elementType": "text", "style": {"color": "green", order: 1}},
	"-JOqvmqmKK81t0p09tJ4": {"id": 3, "parent_id": 0, "elementType": "text", "style": {"color": "green", order: 2}}
};

export const stateObj2 = {
	'1': {
		childIds: [2],
		elementType: 'view',
		id: 1,
		parent_id: 0,
		style: {color: 'blue', order: 1},
		data: {mode_id: 0}
	},
	'2': {
		elementType: 'placeholder',
		id: 2,
		parent_id: 1,
		style: {color: 'white', order: 1},
		data: {mode_id: 0}
	},
	'4': {
		elementType: 'placeholder',
		id: 4,
		parent_id: 1,
		style: {color: 'white', order: 2},
		data: {mode_id: 0}
	}
};

export const stateObj3 = {
	"1": {
		"childIds": [2],
		"data": {"modeId": 0},
		"elementType": "VIEW",
		"id": 1,
		"parent_id": 0,
		"style": {
			"alignItems": "stretch",
			"backgroundPosition": "center center",
			"backgroundRepeat": "no-repeat",
			"backgroundSize": "cover",
			"display": "flex",
			"flex": 1,
			"flexDirection": "column",
			"justifyContent": "flex-start",
			"order": 1,
			"width": "360px"
		}
	},
	"2": {
		"childIds": [3, 4, 5],
		"data": {"modeId": 0, "role": "LIST_ROW"},
		"elementType": "VIEW",
		"id": 2,
		"parent_id": 1,
		"style": {
			"alignItems": "stretch",
			"backgroundPosition": "center center",
			"backgroundRepeat": "no-repeat",
			"backgroundSize": "cover",
			"flexDirection": "row",
			"height": "100px",
			"order": 1
		}
	},
	"3": {
		"data": {"modeId": 0},
		"elementType": "PLACEHOLDER",
		"id": 3,
		"parent_id": 2,
		"style": {"flex": 1, "order": 1}
	},
	"4": {
		"childIds": [6, 7],
		"data": {"modeId": 0},
		"elementType": "VIEW",
		"id": 4,
		"parent_id": 2,
		"style": {"alignItems": "stretch", "flex": 1, "flexDirection": "column", "order": 2}
	},
	"5": {
		"data": {"modeId": 0},
		"elementType": "PLACEHOLDER",
		"id": 5,
		"parent_id": 2,
		"style": {"flex": 1, "order": 3}
	},
	"6": {
		"data": {"data": "לורם אפסום", "modeId": 0},
		"elementType": "TEXT",
		"id": 6,
		"parent_id": 4,
		"style": {"backgroundSize": "cover", "flex": "none", "fontFamily": "Heebo", "fontSize": "25px", "order": 1}
	},
	"7": {
		"data": {"data": "לורם אפסום", "modeId": 0},
		"elementType": "TEXT",
		"id": 7,
		"parent_id": 4,
		"style": {"backgroundSize": "cover", "flex": "none", "fontFamily": "Heebo", "fontSize": "25px", "order": 2}
	}
};

export const actionInjectSnippet = {
	"type": "INJECT_SNIPPET",
	"rootId": 2,
	"rootParentId": 1,
	"rootOrder": 1,
	"snippet": {
		"imageStats": {"height": 194, "ratio": 3.6391752577319587, "width": 706},
		"imageUrl": "https://firebasestorage.googleapis.com/v0/b/hologui-212f6.appspot.com/o/use…39%20AM.png?alt=media&token=a089e8f1-a1c6-452e-97fc-36efb3ee9271&alt=media",
		"role": "LIST_ROW",
		"state": {
			"2": {
				"childIds": [6, 7, 8],
				"data": {
					"data": "",
					"dataTemplate": "[recipes.recipes]",
					"datasetId": "recipes",
					"itemsCount": 2,
					"modeId": 0,
					"role": "LIST_ROW"
				},
				"elementType": "VIEW",
				"id": 2,
				"parent_id": 1,
				"style": {
					"alignItems": "center",
					"backgroundColor": "white",
					"backgroundPosition": "center center",
					"backgroundRepeat": "no-repeat",
					"backgroundSize": "cover",
					"flexDirection": "row",
					"height": "100px",
					"marginBottom": "10px",
					"order": 1
				}
			},
			"6": {
				"data": {"modeId": 0, "role": "LIST_ACTION"},
				"elementType": "IMAGE",
				"id": 6,
				"parent_id": 2,
				"style": {
					"backgroundImage": "url(https://firebasestorage.googleapis.com/v0/b/hologui-212f6.appspot.com/o/user%2Fy5eh9OesOmhONzZ5Q58rPPKWsFP2%2Fimages%2F50.png?alt=media)",
					"backgroundSize": "cover",
					"dimensions": "",
					"flex": "",
					"height": "30px",
					"marginLeft": "10px",
					"order": 3,
					"width": "30px"
				}
			},
			"7": {
				"childIds": [9, 10],
				"data": {"modeId": 0},
				"elementType": "VIEW",
				"id": 7,
				"parent_id": 2,
				"style": {"alignItems": "flex-start", "flex": 1, "flexDirection": "column", "order": 2}
			},
			"8": {
				"data": {
					"data": "https://firebasestorage.googleapis.com/v0/b/hologui-212f6.appspot.com/o/user%2Fy5eh9OesOmhONzZ5Q58rPPKWsFP2%2Fimages%2Ffood.jpg?alt=media",
					"dataTemplate": "[recipes.image]",
					"datasetId": "recipes",
					"modeId": 0,
					"role": "LIST_IMAGE"
				},
				"elementType": "IMAGE",
				"id": 8,
				"parent_id": 2,
				"style": {
					"backgroundImage": "url(/images/image.png)",
					"backgroundSize": "cover",
					"dimensions": "",
					"flex": "none",
					"height": "80px",
					"marginBottom": "",
					"marginLeft": "11px",
					"marginRight": "10px",
					"marginTop": "",
					"order": 1,
					"padding": "",
					"paddingBottom": "",
					"paddingLeft": "",
					"paddingRight": "",
					"paddingTop": "",
					"width": "80px"
				}
			},
			"9": {
				"data": {
					"data": "החריימה של דודה אילנה",
					"dataTemplate": "[recipes.title]",
					"datasetId": "recipes",
					"modeId": 0,
					"role": "LIST_TITLE"
				},
				"elementType": "TEXT",
				"id": 9,
				"parent_id": 7,
				"style": {
					"backgroundSize": "cover",
					"dimensions": "",
					"flex": "none",
					"fontFamily": "Arimo, sans-serif",
					"fontSize": "16px",
					"order": 1
				}
			},
			"10": {
				"data": {
					"data": "דרגת קושי בינונית",
					"dataTemplate": "[recipes.difficultyText]",
					"datasetId": "recipes",
					"modeId": 0,
					"role": "LIST_SUBTITLE"
				},
				"elementType": "TEXT",
				"id": 10,
				"parent_id": 7,
				"style": {
					"backgroundSize": "cover",
					"flex": "none",
					"fontFamily": "Open Sans",
					"fontSize": "14px",
					"order": 2
				}
			}
		},
		"title": "Row with heart",
		"user_name": "Guy Stein",
		"key": "-KR6TDTnic-g5Z2xQjZR"
	},
	"timestamp": 1473406225909,
	"delay": 89929
};

export const snippet = {
	title: 'Beautiful row',
	imageUrl: 'http://lorempixel.com/300/300/',
	imageStats: {width: 300, height: 300, ratio: 1},
	role: 'LIST_ROW',
	user_name: 'Keren S',
	state: {1: {parentId: 0, id: 1, width: 200, height: 200, data: {modeId: 0}}},
};

export const snippet_tag = {
	title: 'Beautiful row',
	image_url: 'http://lorempixel.com/300/300/',
	image_stats: {width: 300, height: 300, ratio: 1},
	role: 'LIST_ROW',
	user_name: 'Keren S',
	state: {1: {parentId: 0, id: 1, width: 200, height: 200, data: {modeId: 0}}},
};


export const snippet2 = {
	imageStats: {height: 194, ratio: 3.6391752577319587, width: 706},
	imageUrl: 'https://firebasestorage.googleapis.com/v0/b/hologui-212f6.appspot.com/o/user%2FhyGm6snlnrbbEIMu4ZVh6zctv9W2%2Fimages%2Fscreenshots%2FScreen%20Shot%202016-09-08%20at%203.50.39%20AM.png?alt=media&token=a089e8f1-a1c6-452e-97fc-36efb3ee9271&alt=media',
	role: 'LIST_ROW'
};

export const snippet3 = {
	title: 'Beautiful row',
	imageUrl: 'http://lorempixel.com/300/300/',
	imageStats: {width: 300, height: 300, ratio: 1},
	role: 'LIST_ROW',
	user_name: 'Keren S',
	state: {"A1": {parentId: 0, id: 1, width: 200, height: 200, data: {modeId: 0}}},
};


export const libraryItem = {
	"thumb": "https://firebasestorage.googleapis.com/v0/b/hologui-212f6.appspot.com/o/user%2FhyGm6snlnrbbEIMu4ZVh6zctv9W2%2Fimages%2F366267023_thumb.jpg",
	"url": "https://firebasestorage.googleapis.com/v0/b/hologui-212f6.appspot.com/o/user%2FhyGm6snlnrbbEIMu4ZVh6zctv9W2%2Fimages%2F366267023.jpg",
}

export const library = {
	items_project: [
		{
			"thumb": "https://firebasestorage.googleapis.com/v0/b/hologui-212f6.appspot.com/o/user%2FhyGm6snlnrbbEIMu4ZVh6zctv9W2%2Fimages%2F366267023_thumb.jpg",
			"url": "https://firebasestorage.googleapis.com/v0/b/hologui-212f6.appspot.com/o/user%2FhyGm6snlnrbbEIMu4ZVh6zctv9W2%2Fimages%2F366267023.jpg",
		}
	],
	items_uploaded: [],
	items_purchased: [],
	items_shutterstock: [],
	items_similar: [],
}

