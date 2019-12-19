using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace lab5
{
    public partial class Form1 : Form
    {
        public DSACryptoServiceProvider cryptoServiceProvider = new DSACryptoServiceProvider();
        public DSAParameters publicKey,privateKey;
        string fileToCreateSignature;
        byte[] currentSignature;
        public Form1()
        {
            InitializeComponent();
        }

        private void radioButton1_CheckedChanged(object sender, EventArgs e)
        {
            if (radioButton1.Checked)
            {
                groupBox1.Visible = true;
            }
            else
            {
                groupBox1.Visible = false;
                label1.Visible = false;
                textBox1.Visible = false;
            }
        }

        private void radioButton2_CheckedChanged(object sender, EventArgs e)
        {
            if (radioButton2.Checked)
            {
                groupBox2.Visible = true;
            }
            else
            {
                groupBox2.Visible = false;
                label1.Visible = false;
                textBox1.Visible = false;
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            privateKey = cryptoServiceProvider.ExportParameters(true);
            publicKey = cryptoServiceProvider.ExportParameters(false);
            File.WriteAllText("private.xml", cryptoServiceProvider.ToXmlString(true));
            File.WriteAllText("public.xml", cryptoServiceProvider.ToXmlString(false));
            radioButton1.Visible = true;
            radioButton2.Visible = true;
            MessageBox.Show("Ключі згенеровано");
        }

        private void button2_Click(object sender, EventArgs e)
        {
            var textBytes = Encoding.Default.GetBytes(richTextBox1.Text);
            cryptoServiceProvider.ImportParameters(privateKey);
            var formatter = new DSASignatureFormatter(cryptoServiceProvider);
            formatter.SetHashAlgorithm("SHA1");
            var sha = SHA1.Create();
            var signature = formatter.CreateSignature(sha.ComputeHash(textBytes));
            currentSignature = signature;
            textBox1.Text = BitConverter.ToString(signature).Replace("-", string.Empty);
            var saveFileDialog = new SaveFileDialog();
            saveFileDialog.Filter = "TXT files (*.txt)|*.txt";
            if (saveFileDialog.ShowDialog() == DialogResult.OK)
            {
                File.WriteAllText(saveFileDialog.FileName, textBox1.Text);
            }
            else
            {
                return;
            }
           
            label1.Visible = true;
            textBox1.Visible = true;
            button6.Visible = true;
        }

        private void button5_Click(object sender, EventArgs e)
        {
            var openFileDialog1 = new OpenFileDialog();
            openFileDialog1.Title = "Публічний Ключ";
            if(openFileDialog1.ShowDialog() == DialogResult.OK)
            {
                cryptoServiceProvider.FromXmlString(File.ReadAllText(openFileDialog1.FileName));
            }
            openFileDialog1 = new OpenFileDialog();
            openFileDialog1.Title = "Приватний ключ";
            if (openFileDialog1.ShowDialog() == DialogResult.OK)
            {
                cryptoServiceProvider.FromXmlString(File.ReadAllText(openFileDialog1.FileName));
            }
            radioButton1.Visible = true;
            radioButton2.Visible = true;
        }

        private void button3_Click(object sender, EventArgs e)
        {
            var openFileDialog1 = new OpenFileDialog();
            if (openFileDialog1.ShowDialog() == DialogResult.OK)
            {
                fileToCreateSignature = openFileDialog1.FileName;
                richTextBox2.Text = openFileDialog1.FileName;
            }
        }

        private void button6_Click(object sender, EventArgs e)
        {
            var signaturefile = "";
            var openFileDialog1 = new OpenFileDialog();
            openFileDialog1.Title = "Виберіть цифровий підпис";
            openFileDialog1.Filter = "TXT files (*.txt)|*.txt";
            if(openFileDialog1.ShowDialog() == DialogResult.OK)
            {
                    signaturefile = openFileDialog1.FileName;
            } else
            {
                return;
            }
            openFileDialog1.Filter = "XML files (*.xml)|*.xml";
            openFileDialog1.Title = "Виберіть публічний ключ";
            if (openFileDialog1.ShowDialog() == DialogResult.OK)
            {
                try
                {
                    cryptoServiceProvider.FromXmlString(File.ReadAllText(openFileDialog1.FileName));
                    var formatter = new DSASignatureDeformatter(cryptoServiceProvider);
                    formatter.SetHashAlgorithm("SHA1");
                    var sha = SHA1.Create();
                    if (radioButton2.Checked)
                        MessageBox.Show(cryptoServiceProvider.VerifySignature(sha.ComputeHash(File.ReadAllBytes(fileToCreateSignature)), StringToByteArray(File.ReadAllText(signaturefile).ToLower())) ? "Цифрові підписи співпадають" : "Цифрові підписи не співпадають");
                    else
                        MessageBox.Show(cryptoServiceProvider.VerifySignature(sha.ComputeHash(Encoding.Default.GetBytes(richTextBox1.Text)), StringToByteArray(File.ReadAllText(signaturefile).ToLower())) ? "Цифрові підписи співпадають" : "Цифрові підписи не співпадають");
                }
                catch(Exception)
                {
                    MessageBox.Show("Помилка завантаження ключа");
                    openFileDialog1.ShowDialog();
                }
            }
        }

        private void button4_Click(object sender, EventArgs e)
        {
            var textBytes = File.ReadAllBytes(fileToCreateSignature);
            cryptoServiceProvider.ImportParameters(privateKey);
            var formatter = new DSASignatureFormatter(cryptoServiceProvider);
            formatter.SetHashAlgorithm("SHA1");
            var sha = SHA1.Create();
            var signature = formatter.CreateSignature(sha.ComputeHash(textBytes));
            currentSignature = signature;
            textBox1.Text = BitConverter.ToString(signature).Replace("-", string.Empty);
            var saveFileDialog = new SaveFileDialog();
            saveFileDialog.Filter = "TXT files (*.txt)|*.txt";
            if (saveFileDialog.ShowDialog() == DialogResult.OK)
            {
                File.WriteAllText(saveFileDialog.FileName, textBox1.Text);
            }
            else
            {
                return;
            }
            label1.Visible = true;
            textBox1.Visible = true;
            button6.Visible = true;
        }
        public static byte[] StringToByteArray(string hex)
        {
            return Enumerable.Range(0, hex.Length)
                             .Where(x => x % 2 == 0)
                             .Select(x => Convert.ToByte(hex.Substring(x, 2), 16))
                             .ToArray();
        }
    }
}
