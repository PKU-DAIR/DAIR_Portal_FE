<template>
	<div class="group-wrap" :class="[{ dark: theme === 'dark' }]">
		<div v-show="showTeam" class="title-block">
			<div class="title-name">{{ teamName }}</div>
		</div>
		<div
			v-for="(group, index) in thisGroups"
			:key="`groups: ${index}`"
			class="group-block"
		>
			<div
				class="group-name"
				:style="{
					background:
						colorList[
							hashStringToRange(group.name, colorList.length)
						],
				}"
			>
				{{ group.name }}
			</div>
			<div class="group-detail">
				<member-unit
					:value="item"
					:avatarDict="avatarDict"
					:groupFilter="groupFilter"
					:size="size"
					:theme="theme"
					class="group-detail-every"
					v-for="(item, index) in thisMembers(group)"
					:key="index"
					@click.native="handleUnitClick(item)"
				>
				</member-unit>
			</div>
		</div>
	</div>
</template>

<script>
import memberUnit from "./memberUnit.vue";

export default {
	name: "about-group",
	components: {
		memberUnit,
	},
	props: {
		showTeam: {
			default: true,
		},
		teamName: {
			default: "团队名",
		},
		groups: {
			default: () => [],
		},
		members: {
			default: () => [],
		},
		groupFilter: {
			default: "",
		},
		groupList: {
			type: Array,
			default: () => [],
		},
		avatarDict: {
			default: () => ({}),
		},
		size: {
			default: 120,
		},
		theme: {
			default: "light",
		},
	},
	data() {
		return {
			colorList: [
				"rgba(52, 145, 186, 1)",
				"rgba(232, 139, 62, 1)",
				"rgba(202, 124, 181, 1)",
				"rgba(72, 19, 149, 1)",
				"rgba(205, 112, 145, 1)",
				"rgba(212, 175, 218, 1)",
				"rgba(101, 116, 220, 1)",
			],
		};
	},
	computed: {
		thisGroups() {
			let groups = this.groups ? this.groups : [];
			groups.forEach((it) => {
				let mit = it.name.split("$");
				it.name = mit[0];
				if (mit.length > 1) it.index = parseFloat(mit[1]);
				else it.index = 9999999;
			});
			groups = groups.sort((a, b) => {
				return a.index - b.index;
			});
			return groups;
		},
		thisMembers() {
			return (group) => {
				let objs = [];
				for (let item of this.members) {
					if (this.teamName === "any") {
						objs.push(item);
						continue;
					}
					let groupIndex = item.groups.findIndex(
						(it) => it.name === group.name
					);

					let teamIndex = item.teams.findIndex(
						(it) => it.name === this.teamName
					);
					if (groupIndex >= 0 && teamIndex >= 0) objs.push(item);
				}
				return objs;
			};
		},
	},
	mounted() {},
	methods: {
		hashStringToRange(str, range) {
			let hash = 5381; // 初始化哈希值为一个常量
			for (let i = 0; i < str.length; i++) {
				hash = (hash * 33) ^ str.charCodeAt(i); // 计算哈希值
			}
			hash = hash >>> 0; // 确保哈希值为正数
			return hash % range; // 取模运算，将哈希值限制在0到range-1
		},
		handleUnitClick(item) {
			if (!item.external) this.$Go(`/team/cv/${item.id}`);
			else this.$Jump(item.external);
		},
	},
};
</script>

<style lang="scss" scoped>
.group-wrap {
	width: 100%;
	height: auto;
    max-width: 1368px;
	margin: 60px auto 0;

	&.dark {
	}

	.title-block {
		position: relative;
		width: 100%;
		height: 80px;
		border: 1px solid transparent;
		display: flex;
		justify-content: center;
		user-select: none;

		.title-name {
			width: 300px;
			height: auto;
			color: rgba(45, 80, 125, 1);
			text-align: center;
			font-size: 18px;
			font-weight: bold;
		}
	}

	.group-block {
		position: relative;
		width: 100%;
		height: auto;
		border: 1px solid transparent;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		user-select: none;

		.group-name {
			position: relative;
            min-width: 130px;
			width: auto;
			height: 30px;
			margin: 35px 0px 50px 0px;
			flex-shrink: 0;
			padding: 3px 15px;
			border-radius: 20px;
			color: whitesmoke;
			display: flex;
			justify-content: center;
			align-items: center;
			box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1),
				0px 0px 3px rgba(235, 96, 147, 0.2);
			cursor: default;
			user-select: none;
		}

		.group-detail {
			position: relative;
			width: 100%;
			height: auto;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			align-content: space-around;
		}
	}
}

@media screen and (max-width: 985px) {
	.title-block {
		.wrapper {
			height: 72px;
			.title-name {
				font-size: 36px;
			}
		}
	}

	.group-detail-every {
		width: 80px;
		height: 180px;
		margin: 0;
		border-radius: 12px;
	}

	.t-content {
		height: 98px;
		overflow: hidden;
		p {
			&.name {
				margin-top: 2px;
				font-size: 10px;
				line-height: 18px;
			}
			&.dir {
				//Todo 字体大小无法改变
				font-size: 0px;
				line-height: 0px;
			}
			&.intro {
				margin: 2px 0 2px 0;
				font-size: 6px;
			}
		}
	}
}
</style>
