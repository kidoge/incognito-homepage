#/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PACK_IGNORE="pack_ignore"

is_pack_target() {
	while read -r line || [[ -n "$line" ]]; do
		line=$(echo $line) # remove \r on Windows sytems
		if [[ "$1" =~ $line ]]; then
			echo "$1 omitted"
			return 0
		fi
	done < $PACK_IGNORE

	if [[ "$1" =~ ^store_assets ]]; then
		return 1
	fi
}

current_branch() {
	git rev-parse --abbrev-ref HEAD
}

check_repository() {
	if [[ "$(current_branch)" != "master" ]]; then
		echo "ERROR: Not on master branch"
		exit 1
	fi

	git diff-files --quiet
	if [[ $1 -ne "0" ]]; then
		echo "ERROR: Repository is dirty"
		exit 1
	fi
}

main() {
	pushd $DIR > /dev/null

	check_repository

	rm -rf package
	mkdir package
	for f in $(git ls-tree -r HEAD --name-only); do
		if is_pack_target $f; then
			cp --parents $f package
		fi
	done
	python -m zipfile -c package.zip package/*

	#clean up
	rm -rf package
	popd > /dev/null
}

main "$@"
