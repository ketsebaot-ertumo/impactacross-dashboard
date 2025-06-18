// /components/shared/entityFormDialog.tsx
"use client";

import { useEntityActions } from '@/hooks/use-query';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogAction,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useSingleEntity } from '@/hooks/use-query';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import NestedEntityDialog from './NestedEntityDialog';
import { uploadImageToCloudinary } from '@/utils/cloudinary';
import { UserResponse } from '@/types';
import { Owner } from '@/types/owner';
import { Section } from '@/types/section';

interface EntityFormDialogProps {
  open: boolean;
  onClose: () => void;
  entity: string;
  initialValues?: any;
  id?: string;
  mode?: 'create' | 'edit' | 'remove' | null;
  data?: {
    users: UserResponse[];
    owners: Owner[];
    sections: Section[];
  };
  columns: { key: string; label: string | boolean | number }[];
  refetch?: () => void;
}

const EntityFormDialog = ({
  open,
  onClose,
  entity,
  initialValues,
  id,
  mode,
  data,
  columns,
  refetch,
}: EntityFormDialogProps) => {
  const [values, setValues] = useState(initialValues || {});
  const [isOpen, setIsOpen] = useState(open);
  const { create, update, remove } = useEntityActions(entity);
  const { data: entityDetail } = useSingleEntity(entity, id || '');
  const { success, error } = useToast();
  const [showLessonDialog, setShowLessonDialog] = useState(false);

  const uploadFields = ['image_url', 'imageURL', 'logo_url', 'fileURL', 'mediaURL'];
  const numberFields = ['durationHours', 'fileSize', 'lat', 'lng'];
  const booleanFields = ['certification'];

  useEffect(() => {
    if (mode === 'create') {
      const emptyValues: Record<string, string | boolean> = {};
      columns.forEach((column) => {
        emptyValues[column.key] = '';
      });
      setValues(emptyValues);
    }
  }, [entityDetail?.data, mode, initialValues]);

  useEffect(() => setIsOpen(open), [open]);
  useEffect(() => { if (!isOpen) onClose(); }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImageToCloudinary(file);
      setValues((prev: any) => ({
        ...prev,
        [key]: url,
      }));
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      error("File upload failed.");
    }
  };

  const handleSubmit = async () => {
    const transformedValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => {
        if (numberFields.includes(key) && value !== '') {
          return [key, Number(value)];
        } else if (booleanFields.includes(key) && value !== '') {
          return [key, value === 'true'];
        }
        return [key, value];
      })
    );

    try {
      let response;
      if (mode === 'edit' && id) {
        response = await update(id, transformedValues);
      } else if (mode === 'remove' && id) {
        response = await remove(id);
      } else {
        response = await create(transformedValues);
      }
      
      if(response?.data?.message){
        success(response?.data?.message || `${entity} ${mode}ed successfully.`);
      } else{
        error(`Unable to ${mode} ${entity}.`)
      }
      
      refetch?.();
      onClose?.();
    } catch (err: any) {
      console.error("Error during submission:", err);
      error("An error occurred while processing your request.");
    }
  };

  const isReadonly = mode === 'remove';

  const statusOptions = entity === 'trainings' ? ['Draft', 'Completed', 'Archived'] : ['Draft', 'Published', 'Archived'];

  const fieldOptions: Record<string, { label: string; value: string | boolean }[]> = {
    role: ['admin', 'user'].map(role => ({ label: role, value: role })),
    is_active: ['active', 'inActive'].map(status => ({ label: status, value: status })),
    status: statusOptions.map(status => ({ label: status, value: status })),
    certification: [true, false].map(v => ({ label: v.toString(), value: v.toString() })),
    mediaType: ["Image", "Video"].map(type => ({ label: type, value: type })),
    userId: data?.users?.map(user => ({ label: user.firstName + ' ' + user.lastName, value: user.id })) || [],
    owner_id: data?.owners?.map(owner => ({ label: owner.name, value: owner.id })) || [],
    section_id: data?.sections?.map(section => ({ label: section.title, value: section.id })) || [],
    mimeType: [
      { label: "JPEG Image", value: "image/jpeg" },
      { label: "PNG Image", value: "image/png" },
      { label: "GIF Image", value: "image/gif" },
      { label: "SVG Image", value: "image/svg+xml" },
      { label: "BMP Image", value: "image/bmp" },
      { label: "WebP Image", value: "image/webp" },
      { label: "MP4 Video", value: "video/mp4" },
      { label: "WebM Video", value: "video/webm" },
      { label: "OGG Video", value: "video/ogg" },
      { label: "AVI Video", value: "video/x-msvideo" },
      { label: "MPEG Video", value: "video/mpeg" },
    ]
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? 'Edit Record' : mode === 'remove' ? 'Delete Record' : 'Create Record'}</DialogTitle>
          <DialogDescription>
            {mode === 'edit' ? 'Update the entity data.' : mode === 'remove' ? 'Delete the entity data.' : 'Fill the form to add a new record.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 overflow-auto max-h-[60vh]">
            {Object.keys(values).map((key) => {
              if (['created_at', 'updated_at', '_id', 'user_id', 'last_login', 'is_active'].includes(key)) return null;

              return (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 capitalize">{key.replace(/_/g, ' ')}</label>

                  {fieldOptions[key] ? (
                    <select
                      id={key}
                      name={key}
                      value={values[key]}
                      onChange={handleChange}
                      className="form-select w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm"
                      disabled={isReadonly}
                    >
                      <option value="">Select {key.replace(/_/g, ' ')}</option>
                      {fieldOptions[key].map((option) => (
                        <option key={String(option.value)} value={String(option.value)}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : key === 'tags' ? (
                    <div className="col-span-2">
                      <button
                        type="button"
                        className="bg-primary text-white px-4 py-2 rounded-md cursor-pointer"
                        onClick={() => setShowLessonDialog(true)}
                      >
                        {`Add ${key}/s`}
                      </button>
                    </div>
                  ) : uploadFields.includes(key) ? (
                    <>
                      {values[key] && (
                        <img src={values[key]} alt="Preview" className="w-24 h-24 object-cover rounded-md mb-2" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        id={key}
                        name={key}
                        onChange={(e) => handleFileUpload(e, key)}
                        className="form-input w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        disabled={isReadonly}
                      />
                    </>
                  ) : (
                    <input
                      type={
                        numberFields.includes(key)
                          ? 'number'
                          : key.toLowerCase().includes('date')
                          ? 'date'
                          : 'text'
                      }
                      id={key}
                      name={key}
                      value={values[key]}
                      onChange={handleChange}
                      className="form-input w-full p-2 border border-gray-300 rounded-md shadow-sm"
                      placeholder={`Enter ${key}`}
                      readOnly={isReadonly}
                    />
                  )}
                </div>
              );
            })}

            {showLessonDialog && (
              <NestedEntityDialog
                open={showLessonDialog}
                onClose={() => setShowLessonDialog(false)}
                entity={entity}
                id={id}
                data={values.Lessons || values.questions || []}
                dataOptions={entity === 'multimedias' ? [{ label: 'tag', value: 'tag' }] : []}
                setData={(newValues: any) =>
                  setValues((prevValues: any) => ({
                    ...prevValues,
                    ...(entity === 'multimedias' ? { tags: newValues.map((item: any) => item.tag) } : {}),
                  }))
                }
                name={entity === 'multimedias' ? 'Tags' : ''}
                refetch={refetch}
              />
            )}
          </div>
          <DialogFooter>
            <DialogAction type="button" onClick={() => setIsOpen(false)}>Cancel</DialogAction>
            <DialogAction onClick={handleSubmit}>{mode === 'edit' || mode === 'remove' ? 'Save' : 'Submit'}</DialogAction>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EntityFormDialog;
