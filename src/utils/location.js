export const Location = {
	/**
	 * @method addHash 向url中添加hash
	 * @param {string} key  hash的键
	 * @param {string*} name hash的值
	 */
	addHash(key, name) {
		let _hash = window.location.hash;

		if (!_hash) {
			_hash = `${key}=${name}`;
		} else {
			if (_hash.indexOf(key) == -1) {
				_hash = `${_hash}&${key}=${name}`;
			} else {
				_hash = _hash.replace(new RegExp("(" + key + "=)[\\w]+"), "$1" + name);
			}
		}

		window.location.hash = _hash;
	},
	/**
	 * @method getHash 获取url中指定的hash;
	 * @param {string} key hash的键
	 * @returns {string} hash的值
	 */
	getHash(key) {
		const _hash = window.location.hash;

		if (_hash) {
			const _name = _hash.match(new RegExp(key + "=([\\w]+)"));

			if (_name) {
				return _name[1] || "";
			}
		}

		return "";
	},
	/**
	 * @method removeHash 删除url中指定的hash;
	 * @param {string} key hash的键
	 */
	removeHash(key) {
		const _hash = window.location.hash;

		if (_hash) {
			if (_hash.indexOf("&") == -1) {
				if (_hash.indexOf(key) != -1) {
					window.location.hash = "";
				}
			} else {
				window.location.hash = _hash.replace(new RegExp(key + "=[\\w]+"), "");
			}
		}
	},
};
