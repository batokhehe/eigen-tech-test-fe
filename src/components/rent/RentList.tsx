import React, { useState, useEffect, useRef } from "react";
import RentDataService from "../../services/RentService";
import { Button, Input, InputRef, Modal, Space, Table, notification } from "antd";
import { ColumnType, ColumnsType } from "antd/es/table";
import { FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { NotificationPlacement } from "antd/es/notification/interface";

interface DataType {
    member_code: string;
    book_code: string;
    rent_date: number;
    return_date: string;
  }
  
type DataIndex = keyof DataType;

const Context = React.createContext({ name: 'Default' });

const RentsList: React.FC = () => {
  const [rents, setRents] = useState([]);

  useEffect(() => {
    retrieveRents();
  }, []);

  const retrieveRents = () => {
    RentDataService.getAll()
      .then((response: any) => {
        setRents(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Book Code',
      dataIndex: 'book_code',
      key: 'book_code',
      width: '30%',
      ...getColumnSearchProps('book_code'),
    },
    {
      title: 'Member Code',
      dataIndex: 'member_code',
      key: 'member_code',
      width: '20%',
      ...getColumnSearchProps('member_code'),
    },
    {
      title: 'Rent Date',
      dataIndex: 'rent_date',
      key: 'rent_date',
      ...getColumnSearchProps('rent_date'),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Return Date',
      dataIndex: 'return_date',
      key: 'return_date',
      ...getColumnSearchProps('return_date'),
      sortDirections: ['descend', 'ascend'],
    },
  ];

  const [bookCode, setBookCode] = useState("");
  const [memberCode, setMemberCode] = useState("");


  const [createOpen, setCreateOpen] = useState(false);
  const [createConfirmLoading, setCreateConfirmLoading] = useState(false);
  const [createModalText, setCreateModalText] = useState('Content of the modal');

  const [returnOpen, setReturnOpen] = useState(false);
  const [returnConfirmLoading, setReturnConfirmLoading] = useState(false);
  const [returnModalText, setReturnModalText] = useState('Content of the modal');

  const showCreateModal = () => {
    setCreateOpen(true);
  };
  const showReturnModal = () => {
    setReturnOpen(true);
  };

  const [api, contextHolder] = notification.useNotification();
  type NotificationType = 'success' | 'info' | 'warning' | 'error';

  const openNotification = (type: NotificationType, placement: NotificationPlacement, _message: string, _description: string) => {
    api[type]({
      message: _message,
      description: <Context.Consumer>{({ name }) => _description }</Context.Consumer>,
      placement,
    });
  };

  const handleCreateOk = () => {
    var json = {
        member_code: "",
        book_code: "",
        max_date: "",
        return_date: "",
        rent_date: "",
    }

    setCreateModalText('Submit data');
    setCreateConfirmLoading(true);
    json.member_code = memberCode;
    json.book_code = bookCode;
    RentDataService.create(json).then((response: any) => {
        openNotification('success', 'bottomRight', 'Success', response.data.message)

        setCreateOpen(false);
        setCreateConfirmLoading(false);

        setMemberCode("");
        setBookCode("");
        retrieveRents();
    }).catch((e: Error) => {
        openNotification('error', 'bottomRight', 'Failed', e.message)

        setCreateModalText(e.message);
        setCreateConfirmLoading(false);
    });
  };

  const handleReturnOk = () => {
    var json = {
        member_code: "",
        book_code: "",
        max_date: "",
        return_date: "",
        rent_date: "",
    }

    setCreateModalText('Submit data');
    setCreateConfirmLoading(true);
    json.member_code = memberCode;
    json.book_code = bookCode;
    RentDataService.update(json).then((response: any) => {
        openNotification('success', 'bottomRight', 'Success', response.data.message)

        setReturnOpen(false);
        setReturnConfirmLoading(false);

        setMemberCode("");
        setBookCode("");
        retrieveRents();
    }).catch((e: Error) => {
        openNotification('error', 'bottomRight', 'Failed', e.message)

        setReturnModalText(e.message);
        setReturnConfirmLoading(false);
    });
  };

  const handleCreateCancel = () => {
    console.log('Clicked cancel button');
    setCreateOpen(false);
  };

  const handleReturnCancel = () => {
    console.log('Clicked cancel button');
    setReturnOpen(false);
  };

  return (
    <>
        {contextHolder}
      <Button type="primary" onClick={showCreateModal}>
        Rent
      </Button>
        &nbsp;
      <Button type="primary" onClick={showReturnModal}>
        Return
      </Button>
      <Modal
        title="Rent"
        open={createOpen}
        onOk={handleCreateOk}
        confirmLoading={createConfirmLoading}
        onCancel={handleCreateCancel}
      >
        <Input placeholder="Book Code" value={bookCode} onChange={(e) => setBookCode(e.target.value ? e.target.value : "")} />
        <br />
        <br />
        <Input placeholder="Member Code" value={memberCode} onChange={(e) => setMemberCode(e.target.value ? e.target.value : "")} />
      </Modal>
      <Modal
        title="Return"
        open={returnOpen}
        onOk={handleReturnOk}
        confirmLoading={returnConfirmLoading}
        onCancel={handleReturnCancel}
      >
        <Input placeholder="Book Code" value={bookCode} onChange={(e) => setBookCode(e.target.value ? e.target.value : "")} />
        <br />
        <br />
        <Input placeholder="Member Code" value={memberCode} onChange={(e) => setMemberCode(e.target.value ? e.target.value : "")} />
      </Modal>

      <Table columns={columns} dataSource={rents} />
    </>
  );
};

export default RentsList;