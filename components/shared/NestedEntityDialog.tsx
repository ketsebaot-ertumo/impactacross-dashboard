import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogAction } from '../ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface EntityFormNestedDialogProps {
  open: boolean;
  onClose: () => void;
  entity?: string;
  id?: string;
  data: any[];
  dataOptions: {
    label: string;
    value: string;
  }[];
  refetch?: () => void;
  name: string;
  setData?: (values: any[]) => void; 
}

interface Props {
  index: number;
  key: string;
  value: string | number | boolean;
}

export default function NestedEntityDialog({
  open,
  onClose,
  entity,
  id,
  data,
  dataOptions,
  name,
  setData, 
}: EntityFormNestedDialogProps) {
  const [values, setValues] = useState<any[]>(data || []);
  const { success, error } = useToast();


  const addEntry = () => {
    const newEntry =
      entity === 'multimedias'
        ? { tag: ''}
        // ? { "tag-1": '...', "tag-2": '...', "tag-3": "..." }
        : {};
    setValues([...values, newEntry]);
  };

  const updateEntry = async ({ index, key, value }: Props) => {
    const updated = [...values];
    updated[index] = { ...updated[index], [key]: value };
    setValues(updated);
    // return setValues(updated);
  };
  
  const removeEntry = (index: number) => {
    const updated = [...values];
    updated.splice(index, 1);
    setValues(updated);
  };

  const handleSubmit = async () => {
    try {
      setData?.(values); 
      onClose();
    } catch (err) {
      console.error(err);
      error('Failed to update data.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage {name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {values.map((entry, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b pb-4"
              >
                {Object.entries(entry).map(([key, val]) => {
                  const isSelect = ['id'].includes(key);

                  return (
                    <div key={key}>
                      <label className="block text-sm font-medium capitalize mb-1">
                        {key.replace('_', ' ')}
                      </label>

                      {isSelect ? (
                        <select
                          className="w-full p-2 border border-gray-300 rounded"
                          value={val as string | number}
                          onChange={(e) =>
                            updateEntry({ index, key, value: e.target.value })
                          }
                        //   disabled={isReadOnly}
                        >
                          <option value="">Select {key}</option>
                          {dataOptions?.map((opt, index) => (
                            <option key={index} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                            ['status'].includes(key) ? (
                              <select
                                className="w-full p-2 border border-gray-300 rounded"
                                value={val as string | number}
                                onChange={(e) =>
                                  updateEntry({ index, key, value: e.target.value })
                                }
                                // disabled={isReadOnly}
                            >
                              <option value="not_started">Not Started</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                            ) : (
                              <>
                                <input
                                  type={typeof val === 'number' ? 'number' : 'text'}
                                  className="w-full p-2 border border-gray-300 rounded"
                                  value={val as string | number}
                                  onChange={(e) =>
                                    updateEntry({
                                      index,
                                      key,
                                      value:
                                        typeof val === 'number'
                                          ? parseFloat(e.target.value)
                                          : e.target.value
                                    })
                                  }
                                //   disabled={isReadOnly}
                                />
                              </>
                            )
                      )}
                    </div>
                  );
                })}

                <div className="flex items-end justify-end">
                  <button
                    type="button"
                    onClick={() => removeEntry(index)}
                    className="text-red-500 text-xl hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={addEntry}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add New
            </button>
          </div>

          <DialogFooter>
            <DialogAction type="button" onClick={onClose}>
              Cancel
            </DialogAction>
            <DialogAction type="submit" onClick={handleSubmit}>
              Save
            </DialogAction>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}



