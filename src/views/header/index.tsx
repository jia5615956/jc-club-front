import { Input, Dropdown, message } from 'antd';
import Logo from '@/imgs/logo.jpg'
import Head from '@/imgs/head.jpg'
import TopMenu from '@components/top-menu'
import { UserOutlined, HeartOutlined, LikeOutlined, LoginOutlined } from '@ant-design/icons'

const { Search } = Input;

const menuItems = [
	{
		label: '个人中心',
		key: 1,
		icon: <UserOutlined style={{ fontSize: '16px' }} />
	},
	{
		label: '我的收藏',
		key: 2,
		icon: <HeartOutlined style={{ fontSize: '16px' }} />
	}, {
		label: '我的点赞',
		key: 3,
		icon: <LikeOutlined style={{ fontSize: '16px' }} />
	},
	{
		type: 'divider',
	},
	{
		label: '退出',
		key: 4,
		icon: <LoginOutlined style={{ fontSize: '16px' }} />
	}
]

const Header = () => {
	const { pathname } = window.location;


	const handleMenuClick = e => {
		console.log(e)
		if (e.key != 1) {
			return message.info('敬请期待')
		}
	}

	return (
		<div className="head-navigator-box">
			<div className="head-navigator">
				<div className="head-navigator-left">
					<div
						className="head-navigator-logo"
						onClick={() =>
							(window.location.href = '/question-bank')
						}>
						<img src={Logo} style={{ height: 50 }} />
					</div>
					<TopMenu />
				</div>
				<div className="head-navigator-user-box">
					<div className="time-box"></div>
					{'/question-bank' == pathname && (
						<div className="head-navigator-input-box">
							<Search
								placeholder="请输入感兴趣的内容～"
								onSearch={(value) => console.log(value)}
								style={{ width: 300, borderRadius: '10px' }}
							/>
						</div>
					)}
					<div className="head-navigator-bell">
						{/* <Icon type="bell" /> */}
					</div>
					<div className="head-navigator-user-img">
						<Dropdown
							menu={{
								items: menuItems,
								onClick: handleMenuClick,
							}}
							placement="bottom"
							trigger={['click']}
							destroyPopupOnHide
							overlayStyle={{
								width: '150px'
							}}
						>
							<img
								src={Head}
								style={{ width: 36, height: 36 }}
							/>
						</Dropdown>

					</div>
				</div>
			</div>
		</div>
	)
}
export default Header