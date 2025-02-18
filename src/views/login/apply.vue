<template>
    <div class="apply-block">
        <transition name="scale-up-to-up">
            <fv-progress-bar
                v-show="Apply.Lock"
                :loading="true"
                foreground="#FF8B00"
                style="position: absolute; left: 0px; top: 0px; width: 100%;"
            ></fv-progress-bar>
        </transition>
        <div class="d-1">
            <p>Apply Account</p>
            <p>To achieve more information</p>
        </div>
        <div class="main-block">
            <div class="s1">
                <fv-text-box
                    v-model="Form.UserName"
                    theme="dark"
                    placeholder="User ID"
                    borderWidth="2"
                    :revealBorder="true"
                    :border-radius="6"
                    border-color="rgba(200, 200, 200, 0.1)"
                    focusBorderColor="rgba(221, 151, 45, 0.1)"
                    :is-box-shadow="true"
                    background="rgba(120, 120, 120, 0.7)"
                    style="width: 90%; min-height: 50px; margin-top: 45px;"
                    @keyup="handleEnter"
                ></fv-text-box>
                <fv-text-box
                    v-model="Form.Email"
                    theme="dark"
                    placeholder="Email (someone@example.com)"
                    borderWidth="2"
                    :revealBorder="true"
                    :border-radius="6"
                    border-color="rgba(200, 200, 200, 0.1)"
                    focusBorderColor="rgba(221, 151, 45, 0.1)"
                    :is-box-shadow="true"
                    background="rgba(120, 120, 120, 0.7)"
                    style="width: 90%; min-height: 50px; margin-top: 15px;"
                    @keyup="handleEnter"
                ></fv-text-box>
                <fv-text-box
                    placeholder="Password (no less than 6 characters)"
                    theme="dark"
                    v-model="Form.Password"
                    type="password"
                    borderWidth="2"
                    :revealBorder="true"
                    :border-radius="6"
                    border-color="rgba(200, 200, 200, 0.1)"
                    focusBorderColor="rgba(221, 151, 45, 0.1)"
                    :is-box-shadow="true"
                    background="rgba(120, 120, 120, 0.7)"
                    style="width: 90%; min-height: 50px; margin-top: 15px;"
                    @keyup="handleEnter"
                ></fv-text-box>
                <fv-button
                    background="linear-gradient(to right, #ec008c, #da4453)"
                    theme="dark"
                    borderRadius="50"
                    fontSize="16"
                    fontWeight="600"
                    style="width: 50px; height: 50px; margin-top: 20px;"
                    :disabled="Apply.Lock"
                    @click="handleApply"
                >
                    <p class="ms-Icon ms-Icon--ChevronRight"></p>
                </fv-button>
            </div>
        </div>
        <div
            class="s3"
            @click="$Go('/login')"
        >
            <p>已有帐号了? 登录</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "SASApply",
    data: function () {
        return {
            Form: {
                UserName: "",
                Email: "",
                Password: "",
                VerifyCode: "",
            },
            Apply: {
                Lock: false,
            },
        };
    },
    methods: {
        verifyInput() {
            if (this.Form.UserName == "") {
                this.$barWarning("用户名不能为空", {
                    status: "warning",
                });
                return false;
            } else if (
                this.Form.Email.match(
                    /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/g
                ) === null
            ) {
                this.$barWarning("邮箱格式有误", {
                    status: "warning",
                });
                return false;
            } else if (this.Form.Password == "") {
                this.$barWarning("密码不能为空", {
                    status: "warning",
                });
                return false;
            }
            return true;
        },
        async handleApply() {
            if (!this.verifyInput()) return;
            if (this.Apply.Lock) return;
            this.Apply.Lock = true;
            let form = this.Form;
            this.$api.User.Register(
                form.UserName,
                form.Password,
                null,
                form.Email,
                null
            )
                .then(() => {
                    this.$barWarning("注册成功", {
                        status: "correct",
                    });
                    this.Apply.Lock = false;
                    this.$Go("/login");
                })
                .catch((result) => {
                    if (result.data) {
                        result = result.data;
                    }
                    let msg =
                        result.errors != null
                            ? result.errors[0].message
                            : result.title;
                    this.$barWarning(`注册失败: 原因: ${msg}`, {
                        status: "warning",
                    });
                    this.Apply.Lock = false;
                });
        },
        handleEnter(event) {
            if (event.keyCode == 13) this.handleApply();
        },
    },
};
</script>

<style lang="scss">
.apply-block {
    @include FullRelative;
    @include HcenterVcenterC;

    flex: 1;

    .d-1 {
        @include HcenterVcenterC;

        height: 150px;

        p {
            &:first-child {
                @include ms-fontSize-28;

                color: rgba(50, 49, 48, 1);
            }

            &:nth-child(2) {
                @include color-gray;

                margin-top: 15px;
                font-size: 15px;
            }
        }
    }

    .main-block {
        @include HcenterVcenterC;

        position: relative;
        width: 80%;
        max-width: 450px;
        height: auto;
        background: rgba(0, 0, 0, 1);
        border: rgba(90, 90, 90, 0.1) solid thin;
        border-radius: 12px;
        box-shadow: 0 0px 3px 0 rgba(54, 60, 85, 0.05),
            0 0px 3px 0 rgba(66, 73, 21, 0.22);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        overflow: hidden;

        .s1 {
            @include FullRelative;
            @include HcenterC;

            flex: 1;
            padding: 25px;

            .main-title {
                @include color-orange-pink;

                font-weight: 400;
            }

            .s2 {
                @include HcenterVcenter;

                margin-top: 25px;

                .to-apply {
                    @include a-link;

                    font-size: 12px;
                }
            }
        }
    }

    .s3 {
        @include a-link;

        height: 150px;
        margin-top: 35px;
        font-size: 12px;
    }
}
</style>