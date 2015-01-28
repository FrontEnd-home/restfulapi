"use strict";

exports.ARTICLE = {
	CREATE:{
		INPUT_ERROR:{
			code: 1001,
			message: '_id是必须没有的'
		}
	},
	READ:{
		INPUT_ERROR:{
			code: 1001,
			message: '_id是必须的'
		}
	},
	UPDATE:{
		INPUT_ERROR:{
			code: 1001,
			message: '_id是必须的'
		}
	},
	DELETE:{
		INPUT_ERROR:{
			code: 1001,
			message: '_id是必须的'
		}
	},
	READ_BY_CATEGORY_ID:{
		INPUT_ERROR:{
			code: 1001,
			message: 'category的_id是必须的'
		}
	},
	READ_BY_TAG_ID:{
		INPUT_ERROR:{
			code: 1001,
			message: 'tag的_id是必须的'
		}
	}
}

exports.CATEGORY = {
	CREATE:{
		INPUT_ERROR:{
			code: 1001,
			message: '_id是必须没有的'
		}
	},
	READ:{
		INPUT_ERROR:{
			code: 1001,
			message: '_id是必须的'
		}
	},
	UPDATE:{
		INPUT_ERROR:{
			code: 1001,
			message: '_id是必须的'
		}
	},
	DELETE:{
		INPUT_ERROR:{
			code: 1001,
			message: '_id是必须的'
		}
	},
	READ_BY_PARENT_ID:{
		INPUT_ERROR:{
			code: 1001,
			message: '_parent_id是必须的'
		}
	}
}

exports.TAG = {
	CREATE:{
		INPUT_ERROR:{
			code: 1001,
			message: '_id是必须没有的'
		}
	},
	READ:{
		INPUT_ERROR:{
			code: 1001,
			message: '_id是必须的'
		}
	},
	UPDATE:{
		INPUT_ERROR:{
			code: 1001,
			message: '_id是必须的'
		}
	},
	DELETE:{
		INPUT_ERROR:{
			code: 1001,
			message: '_id是必须的'
		}
	}
}