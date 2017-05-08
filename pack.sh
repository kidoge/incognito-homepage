#/bin/bash

function is_pack_target() {
	if [[ "$1" =~ xcf$ ]]; then
		echo "$1 omitted"
		return 0
	fi
	return 1
}

function main() {
	rm -rf package
	mkdir package
	for f in $(git ls-tree -r master --name-only); do
		if is_pack_target $f; then
			cp --parents $f package
		fi
	done
	python -m zipfile -c package.zip package/*

	#clean up
	rm -rf package
}

main "$@"
